
from pydantic import BaseModel
from typing import Optional

class TokenCreate(BaseModel):
    visitor_name: str
    service_type: str
    priority: Optional[str] = "Normal"


class TokenStatusUpdate(BaseModel):
    status: str
