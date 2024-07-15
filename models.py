from pydantic import BaseModel
import uuid

class Campground(BaseModel):
    id: uuid.UUID
    name: str
