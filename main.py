from contextlib import asynccontextmanager
from camply.providers import RecreationDotGov # , ReserveCalifornia
from camply.search import SearchRecreationDotGov # , SearchReserveCalifornia
from camply.containers import SearchWindow
from fastapi import FastAPI, HTTPException
from models import Campground, CreateScoutRequest, Scout
import uuid


providers = [RecreationDotGov()] # , ReserveCalifornia()]

campgrounds: dict[str, Campground] = {}   # in-memory storage
scouts: dict[uuid.UUID, Scout] = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    for prov in providers:
        response = prov.find_campgrounds(search_string="", state="CA")
        campgrounds.update({str(r.facility_id): r for r in response})
    yield

app = FastAPI(lifespan=lifespan)

@app.get("/")
async def root():
    return {"message": "hello world"}

@app.get("/campground/{id}")
def get_campground(id: str):
    if id not in campgrounds:
        raise HTTPException(status_code=404, detail="Campground not found.")
    return {"campground": campgrounds[id]}

@app.get("/campground")
def get_campgrounds():
    return {"campgrounds": campgrounds}

@app.post("/scout")
def add_scout(request: CreateScoutRequest):
    scout = Scout(
        id=uuid.uuid4(), 
        campground_id=request.campground_id, 
        start_date=request.start_date, 
        end_date=request.end_date)
    scouts[scout.id] = scout
    # after save to db, exec continuous search in separate thread
    window = SearchWindow(start_date=scout.start_date, end_date=scout.end_date)
    search = SearchRecreationDotGov(window, campgrounds=[int(scout.campground_id)])
    print(search.get_matching_campsites())
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