from contextlib import asynccontextmanager
import datetime
from camply.providers import ReserveCalifornia, RecreationDotGov
from fastapi import BackgroundTasks, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import logging
from models import Campground, CreateScoutRequest, Scout
from tasks import send_scout
import uuid

logger = logging.getLogger(__name__)

providers = [ReserveCalifornia(), RecreationDotGov()]

campgrounds: dict[str, Campground] = {}   # in-memory storage
scouts: dict[uuid.UUID, Scout] = {}

# preloads campgrounds
@asynccontextmanager
async def lifespan(app: FastAPI):
    with open('state.json') as f:
        raw_cg = json.load(f)
    
    for cg in raw_cg:
        try:
            campgrounds[cg['facility_id']] = Campground(
                facility_name=cg['facility_name'],
                recreation_area=cg['recreation_area'],
                facility_id=cg['facility_id'],
                recreation_area_id=cg['recreation_area_id'],
                map_id=None,
                coordinates=None)
        except Exception as e:
            print(e)
            print(cg)

    yield

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:3000", # make env variable
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    return {"campgrounds": list(campgrounds.values())}

@app.post("/scout")
async def add_scout(request: CreateScoutRequest, background_tasks: BackgroundTasks):
    logger.info(f"Add Scout with the following request: {request}")
    campground = campgrounds[request.campground_id]
    if campground is None:
        raise HTTPException(status_code=404, detail="Campground not found.")
    
    scout = Scout(
        id=uuid.uuid4(), 
        campground_id=campground.facility_id, 
        facility_name=campground.facility_name,
        start_date=request.start_date, 
        end_date=request.end_date,
        created_at=datetime.datetime.now())
    
    background_tasks.add_task(send_scout, scout)

    scouts[scout.id] = scout

    return scout

@app.get("/scout/{id}")
def get_scout(id: uuid.UUID):
    if id not in scouts:
        raise HTTPException(status_code=404, detail="Scout not found.")
    return {"scout": scouts[id]}

@app.get("/scout")
def get_scouts():
    return {"scouts": list(scouts.values())}

@app.delete("/scout/{id}")
def delete_scout(id: uuid.UUID):
    if id not in scouts:
        raise HTTPException(status_code=404, detail="Scout not found.")
    return {"result": f"Scout {id} deleted."}