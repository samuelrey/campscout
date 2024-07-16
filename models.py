import datetime
from typing import Optional
from pydantic import BaseModel
import uuid

class Campground(BaseModel):
    facility_name: str
    recreation_area: str
    facility_id: str
    recreation_area_id: str
    map_id: Optional[str]
    coordinates: Optional[str]

class Scout(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    campground_id: uuid.UUID
    start_date: datetime.date
    end_date: datetime.date