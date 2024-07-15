import datetime
from pydantic import BaseModel
import uuid

class Campground(BaseModel):
    id: uuid.UUID
    name: str

class Scout(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    campground_id: uuid.UUID
    start_date: datetime.date
    end_date: datetime.date