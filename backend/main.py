
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
from models import QueueToken
from schemas import TokenCreate, TokenStatusUpdate

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Queue Management System",
    description="Smart Queue and Service-Time Optimization Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {
        "message": "Smart Queue Management Backend is Running!"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/tokens")
def create_token(data: TokenCreate, db: Session = Depends(get_db)):
    count = db.query(QueueToken).count()
    token_number = f"Q{count + 1:03d}"

    new_token = QueueToken(
        token_number=token_number,
        visitor_name=data.visitor_name,
        service_type=data.service_type,
        priority=data.priority
    )

    db.add(new_token)
    db.commit()
    db.refresh(new_token)

    return {
        "message": "Token generated successfully",
        "token_number": new_token.token_number,
        "visitor_name": new_token.visitor_name,
        "service_type": new_token.service_type,
        "status": new_token.status
    }

@app.get("/queue")
def get_queue(db: Session = Depends(get_db)):
    tokens = db.query(QueueToken).order_by(
        QueueToken.id.asc()
    ).all()

    return tokens

@app.get("/queue/status")
def queue_status(db: Session = Depends(get_db)):
    tokens = db.query(QueueToken).order_by(
        QueueToken.id.asc()
    ).all()

    return {
        "total_tokens": len(tokens),
        "waiting": sum(t.status == "Waiting" for t in tokens),
        "serving": sum(t.status == "Serving" for t in tokens),
        "completed": sum(t.status == "Completed" for t in tokens),
        "cancelled": sum(t.status == "Cancelled" for t in tokens),
        "current_serving": next(
            (t.token_number for t in tokens if t.status == "Serving"),
            None
        )
    }

@app.get("/queue/position/{token_number}")
def queue_position(
    token_number: str,
    db: Session = Depends(get_db)
):
    tokens = db.query(QueueToken).order_by(
        QueueToken.id.asc()
    ).all()

    token = next(
        (t for t in tokens if t.token_number == token_number),
        None
    )

    if not token:
        raise HTTPException(status_code=404, detail="Token not found")

    if token.status == "Completed":
        return {
            "token_number": token_number,
            "status": "Completed",
            "message": "Your service is completed."
        }

    if token.status == "Cancelled":
        return {
            "token_number": token_number,
            "status": "Cancelled",
            "message": "This token has been cancelled."
        }

    if token.status == "Serving":
        return {
            "token_number": token_number,
            "status": "Serving",
            "position": 0,
            "people_ahead": 0,
            "message": "Your turn is being served."
        }

    waiting_tokens = [
        t for t in tokens if t.status == "Waiting"
    ]

    position = next(
        i + 1 for i, t in enumerate(waiting_tokens)
        if t.token_number == token_number
    )

    currently_serving = any(
        t.status == "Serving" for t in tokens
    )

    people_ahead = position - 1 + int(currently_serving)

    return {
        "token_number": token_number,
        "status": token.status,
        "position": position,
        "people_ahead": people_ahead
    }

@app.patch("/tokens/{token_number}/status")
def update_token_status(
    token_number: str,
    data: TokenStatusUpdate,
    db: Session = Depends(get_db)
):
    allowed_statuses = [
        "Waiting", "Serving", "Completed", "Cancelled"
    ]

    if data.status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid status"
        )

    token = db.query(QueueToken).filter(
        QueueToken.token_number == token_number
    ).first()

    if not token:
        raise HTTPException(
            status_code=404,
            detail="Token not found"
        )

    if token.status in ["Completed", "Cancelled"]:
        raise HTTPException(
            status_code=400,
            detail="This token is already closed"
        )

    if data.status == "Serving":
        existing = db.query(QueueToken).filter(
            QueueToken.status == "Serving"
        ).first()

        if existing and existing.id != token.id:
            raise HTTPException(
                status_code=409,
                detail="Another token is already being served"
            )

        if token.status != "Waiting":
            raise HTTPException(
                status_code=400,
                detail="Only waiting tokens can start service"
            )

    if data.status == "Completed" and token.status != "Serving":
        raise HTTPException(
            status_code=400,
            detail="Only serving tokens can be completed"
        )

    token.status = data.status

    if data.status == "Serving":
        token.started_at = __import__("datetime").datetime.now(
            __import__("datetime").timezone.utc
        )

    if data.status == "Completed":
        token.completed_at = __import__("datetime").datetime.now(
            __import__("datetime").timezone.utc
        )

    db.commit()
    db.refresh(token)

    return {
        "message": "Token status updated successfully",
        "token_number": token.token_number,
        "status": token.status
    }

@app.get("/tokens/{token_number}")
def get_token(
    token_number: str,
    db: Session = Depends(get_db)
):
    token = db.query(QueueToken).filter(
        QueueToken.token_number == token_number
    ).first()

    if not token:
        raise HTTPException(
            status_code=404,
            detail="Token not found"
        )

    return token


DEFAULT_SERVICE_TIMES = {
    "General Consultation": 6,
    "Document Verification": 4,
    "Registration": 3,
    "Other Services": 5
}

def get_average_service_time(service_type, db):
    completed_tokens = db.query(QueueToken).filter(
        QueueToken.service_type == service_type,
        QueueToken.status == "Completed",
        QueueToken.started_at.isnot(None),
        QueueToken.completed_at.isnot(None)
    ).all()

    durations = []

    for token in completed_tokens:
        duration = (
            token.completed_at - token.started_at
        ).total_seconds() / 60

        if duration > 0:
            durations.append(duration)

    if durations:
        return sum(durations) / len(durations)

    return DEFAULT_SERVICE_TIMES.get(service_type, 5)


@app.get("/tokens/{token_number}/estimate")
def estimate_waiting_time(
    token_number: str,
    db: Session = Depends(get_db)
):
    tokens = db.query(QueueToken).order_by(
        QueueToken.id.asc()
    ).all()

    token = next(
        (t for t in tokens if t.token_number == token_number),
        None
    )

    if not token:
        raise HTTPException(
            status_code=404,
            detail="Token not found"
        )

    if token.status == "Completed":
        return {
            "token_number": token_number,
            "status": "Completed",
            "estimated_wait_minutes": 0,
            "message": "Your service is completed."
        }

    if token.status == "Cancelled":
        return {
            "token_number": token_number,
            "status": "Cancelled",
            "estimated_wait_minutes": None,
            "message": "This token has been cancelled."
        }

    if token.status == "Serving":
        return {
            "token_number": token_number,
            "status": "Serving",
            "estimated_wait_minutes": 0,
            "message": "Your service is currently in progress."
        }

    active_tokens = [
        t for t in tokens
        if t.status in ["Waiting", "Serving"]
    ]

    target_index = next(
        i for i, t in enumerate(active_tokens)
        if t.token_number == token_number
    )

    tokens_ahead = active_tokens[:target_index]

    estimated_wait = sum(
        get_average_service_time(t.service_type, db)
        for t in tokens_ahead
    )

    return {
        "token_number": token_number,
        "status": token.status,
        "people_ahead": len(tokens_ahead),
        "estimated_wait_minutes": round(estimated_wait, 1),
        "estimation_method": "Historical average or default service time"
    }

