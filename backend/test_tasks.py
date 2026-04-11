import datetime
import threading
import uuid
from unittest.mock import MagicMock, patch

from models import Scout
from tasks import send_scout


def make_scout():
    return Scout(
        id=uuid.uuid4(),
        campground_id="123",
        facility_name="Test Campground",
        start_date=datetime.datetime(2026, 5, 1),
        end_date=datetime.datetime(2026, 5, 7),
        created_at=datetime.datetime.now(),
    )


def test_status_found_when_matches_returned():
    scout = make_scout()
    stop_event = threading.Event()

    with patch("tasks.SearchRecreationDotGov") as MockSearch:
        mock_provider = MagicMock()
        MockSearch.return_value = mock_provider
        mock_provider.get_matching_campsites.return_value = [MagicMock()]

        send_scout(scout, stop_event)

    assert scout.status == "found"


def test_status_stopped_when_stop_event_set():
    scout = make_scout()
    stop_event = threading.Event()

    with patch("tasks.SearchRecreationDotGov") as MockSearch:
        mock_provider = MagicMock()
        MockSearch.return_value = mock_provider

        def poll_and_stop(*_, **__):
            stop_event.set()
            return []

        mock_provider.get_matching_campsites.side_effect = poll_and_stop

        send_scout(scout, stop_event)

    assert scout.status == "stopped"


def test_status_error_when_exception_raised():
    scout = make_scout()
    stop_event = threading.Event()

    with patch("tasks.SearchRecreationDotGov") as MockSearch:
        mock_provider = MagicMock()
        MockSearch.return_value = mock_provider
        mock_provider.get_matching_campsites.side_effect = Exception("network error")

        send_scout(scout, stop_event)

    assert scout.status == "error"
