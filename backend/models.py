from datetime import datetime
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

class CreateScoutRequest(BaseModel):
    campground_id: str
    start_date: datetime
    end_date: datetime

class Scout(BaseModel):
    id: uuid.UUID
    campground_id: str
    start_date: datetime
    end_date: datetime