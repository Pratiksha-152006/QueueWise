from pydantic import BaseModel
from typing import Optional

class TokenCreate(BaseModel):
    visitor_name: str
    service_type: str
    organization_type: Optional[str] = None
    phone_number: Optional[str] = None
    priority: Optional[str] = "Normal"

class TokenStatusUpdate(BaseModel):
    status: str
