from fastapi import FastAPI, HTTPException
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
    
@app.get("/campground/{id}")
def get_campground(id: uuid.UUID):
    return {"campground": campgrounds[id]}

@app.get("/campground")
def get_campgrounds():
    return {"campgrounds": campgrounds}

@app.delete("/campground/{id}")
def delete_campground(id: uuid.UUID):
    if id not in campgrounds:
        raise HTTPException(status_code=404, detail="Item not found.")
    del campgrounds[id]
    return
