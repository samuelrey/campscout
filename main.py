from fastapi import FastAPI
from models import Campground
import uuid

app = FastAPI()
campgrounds: dict[uuid.UUID, Campground] = {}   # in-memory storage

@app.get("/")
async def root():
    return {"message": "hello world"}

@app.post("/campground/{name}")
def add_campground(name: str):
    id = uuid.uuid4()
    campgrounds[id] = Campground(id=id, name=name)
    return {"campground": campgrounds[id]}