
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class QueueToken(Base):
    __tablename__ = "queue_tokens"

    id = Column(Integer, primary_key=True, index=True)
    token_number = Column(String, unique=True, index=True)
    visitor_name = Column(String, nullable=False)
    service_type = Column(String, nullable=False)
    status = Column(String, default="Waiting")
    priority = Column(String, default="Normal")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
