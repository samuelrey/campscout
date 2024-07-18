from camply.containers import SearchWindow
from camply.notifications import AppriseNotifications
from camply.search import SearchRecreationDotGov
from models import Scout

def send_scout(scout: Scout):
    window = SearchWindow(
        start_date=scout.start_date,
        end_date=scout.end_date)

    search_provider = SearchRecreationDotGov(
        search_window=window,
        campgrounds=[int(scout.campground_id)])
    
    notification_provider = AppriseNotifications()

    matches = search_provider.get_matching_campsites(
        continuous=True,
        notification_provider=[notification_provider])
