from camply.containers import SearchWindow
from camply.notifications import SilentNotifications
from camply.search import SearchRecreationDotGov # type: ignore
from models import Scout
import threading

POLL_INTERVAL_SECONDS = 60

def send_scout(scout: Scout, stop_event: threading.Event = threading.Event()):
    window = SearchWindow(
        start_date=scout.start_date,
        end_date=scout.end_date)

    search_provider = SearchRecreationDotGov(
        search_window=window,
        campgrounds=[int(scout.campground_id)])

    notification_provider = SilentNotifications()

    try:
        while not stop_event.is_set():
            matches = search_provider.get_matching_campsites(
                continuous=False,
                notification_provider=[notification_provider]) # type: ignore
            if matches:
                scout.status = "found"
                return
            stop_event.wait(timeout=POLL_INTERVAL_SECONDS)
        scout.status = "stopped"
    except Exception:
        scout.status = "error"
