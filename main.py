from contextlib import asynccontextmanager
from camply.providers import RecreationDotGov # , ReserveCalifornia
from camply.search import SearchRecreationDotGov # , SearchReserveCalifornia
from camply.containers import SearchWindow
from fastapi import BackgroundTasks, FastAPI, HTTPException
from models import Campground, CreateScoutRequest, Scout
from tasks import send_scout
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
async def add_scout(request: CreateScoutRequest, background_tasks: BackgroundTasks):
    scout = Scout(
        id=uuid.uuid4(), 
        campground_id=request.campground_id, 
        start_date=request.start_date, 
        end_date=request.end_date)
    
    background_tasks.add_task(send_scout, scout)

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