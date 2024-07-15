from fastapi import FastAPI, HTTPException
from models import Campground, Scout
import uuid

app = FastAPI()
campgrounds: dict[uuid.UUID, Campground] = {}   # in-memory storage
scouts: dict[uuid.UUID, Scout] = {}

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
    if id not in campgrounds:
        raise HTTPException(status_code=404, detail="Campground not found.")
    return {"campground": campgrounds[id]}

@app.get("/campground")
def get_campgrounds():
    return {"campgrounds": campgrounds}

@app.delete("/campground/{id}")
def delete_campground(id: uuid.UUID):
    if id not in campgrounds:
        raise HTTPException(status_code=404, detail="Campground not found.")
    del campgrounds[id]
    return {"result": f"Campground {id} deleted."}

@app.post("/scout")
def add_scout(scout: Scout):
    if scout.id in scouts:
        raise HTTPException(status_code=400, detail="Scout already exists.")
    scouts[scout.id] = scout
    return scout

@app.get("/scout/{id}")
def get_scout(id: uuid.UUID):
    if id not in scouts:
        raise HTTPException(status_code=404, detail="Scout not found.")
    return {"scout": scouts[id]}

@app.delete("/scout/{id}")
def delete_scout(id: uuid.UUID):
    if id not in scouts:
        raise HTTPException(status_code=404, detail="Scout not found.")
    return {"result": f"Scout {id} deleted."}