# Campscout

A campsite availability notifier. Users pick a campground and date range; the app watches Recreation.gov (and Reserve California) in the background and sends a push notification when a site opens up.

## Architecture

```
campscout/
├── backend/          # FastAPI + Python
│   ├── main.py       # App entrypoint, routes, in-memory state
│   ├── models.py     # Pydantic models: Campground, Scout, CreateScoutRequest
│   ├── tasks.py      # Background task: polls Recreation.gov via camply, fires notifications
│   ├── state.json    # Pre-seeded campground list (~3000 entries, loaded at startup)
│   └── requirements.txt
└── frontend/         # React + MUI
    └── src/
        ├── App.js
        ├── services/campscout.js        # API client (fetch wrappers)
        └── components/
            ├── SearchForm.jsx           # Main form: rec area → campground → date range → subscribe
            ├── RecreationAreaSelect.jsx # Filters campground list
            ├── CampgroundSelect.jsx     # Autocomplete campground picker
            ├── DateRangeSelect.jsx      # Date range picker
            └── ScoutList.jsx           # Displays active scouts
```

## Key concepts

- **Scout**: a subscription pairing a campground with a date window. Creating one kicks off a continuous background poll.
- **camply**: the Python library doing the heavy lifting — searches Recreation.gov / Reserve California, handles rate limiting, fires notifications via Apprise.
- **state.json**: static snapshot of available campgrounds. Loaded once at startup into an in-memory dict keyed by `facility_id`. No database.
- **In-memory storage**: both `campgrounds` and `scouts` live in dicts on the FastAPI process — no persistence between restarts.

## Running locally

**Backend**
```bash
cd backend
uvicorn main:app --reload
# runs on http://localhost:8000
```

**Frontend**
```bash
cd frontend
npm start
# runs on http://localhost:3000
```

## Known rough edges / active areas

- `CampgroundSelect.jsx:19` — `handleChange` passes `option.label` (the name string) to the parent, but `SearchForm.jsx` uses `selectedCampground.id` when calling the API. This is a bug: campground ID will be undefined.
- No persistence — scouts are lost on backend restart.
- `tasks.py` uses `SearchRecreationDotGov` hardcoded; `state.json` contains Reserve California campgrounds (CA State Parks), so the correct provider is `SearchReserveCalifornia`. Its signature is `SearchReserveCalifornia(search_window, recreation_area: List[int], campgrounds: List[str])` — campground IDs stay as strings, not ints.
- Reserve California migrated off `calirdr.usedirect.com` to `california-rdr.prod.cali.rd12.recreation-management.tylerapp.com`. camply 0.34.1+ has this URL; older versions will get DNS 0.0.0.0.
- No way to cancel/delete a running scout from the UI (delete endpoint exists in the API but isn't wired up).
- CORS origin is hardcoded to `localhost:3000`.

## Agent guidance

- **Do not use orchestration (sub-agents) for debugging tasks.** Debugging is sequential and context-dependent — sub-agents start cold and lose the context that makes diagnosis possible. Single agent, step by step.
- **Read before touching.** For any provider/library change: check the actual data (`state.json`), read the library's `__init__` signature, confirm the API is reachable before editing code.
- **Check both sides of a dependency.** Adding an import means checking `package.json` / `requirements.txt`. Adding a package means checking for conflicts with pinned versions.

## Engineering norms

Act as a senior fullstack engineering partner:
- Read relevant code before suggesting changes.
- Prefer editing existing files over creating new ones.
- Don't add abstractions, helpers, or error handling beyond what the task requires.
- Keep changes minimal and targeted — don't refactor surrounding code while fixing a bug.
- Point out bugs or design issues you notice, but don't fix them unless asked.
- The stack is FastAPI + Pydantic v1 on the backend, React + MUI on the frontend. Match existing patterns.
- Prefer compile-time type enforcement over runtime checks — use `Literal`, `Enum`, or precise type annotations rather than `str`/`int` where values are constrained.
- Keep changes compile-ready at each step. When a change breaks a callsite in another file, either fix the callsite in the same commit or make the signature backwards-compatible (e.g. a default argument) with a comment flagging the follow-up.
