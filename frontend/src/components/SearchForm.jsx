import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Alert, Button, CircularProgress } from "@mui/material";
import { getCampgrounds, createCampscout } from "../services/campscout";
import CampgroundSelect from "./CampgroundSelect";
import DaterangeSelect from "./DateRangeSelect";
import RecreationAreaSelect from "./RecreationAreaSelect";

const today = dayjs();

const SearchForm = () => {
    const [campgrounds, setCampgrounds] = useState([]);
    const [selectedCampground, setSelectedCampground] = useState("");
    const [selectedRecreationArea, setSelectedRecreationArea] = useState([]);
    const [daterange, setDaterange] = useState({
        startDate: today,
        endDate: today.add(1, "day"),
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const recreationAreas = [...new Set(campgrounds.map(cg => cg.recreation_area))];
    useEffect(() => {
        const fetchCampgrounds = async () => {
            try {
                const result = await getCampgrounds();
                const data = await result.json();
                setCampgrounds(data.campgrounds);
            } catch (error) {
                setError("Failed to get campgrounds.");
            } finally {
                setLoading(false);
            }
        };
        fetchCampgrounds();
    }, []);

    const handleSelectRecreationArea = (recreationArea) => {
        setSelectedRecreationArea(recreationArea);
    }

    const handleSelectCampground = (campground) => {
        setSelectedCampground(campground);
    };

    const handleSelectDaterange = (daterange) => {
        setDaterange(daterange);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await createCampscout(
                selectedCampground.id,
                daterange.startDate,
                daterange.endDate
            );
        } catch (error) {
            setError("Failed to create scout.");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !campgrounds && !recreationAreas) {
        return <CircularProgress />;
    }

    return (
        <form onSubmit={handleSubmit}>
            {error !== null && <Alert severity="error">{error}</Alert>}
            {loading && <CircularProgress />}
            <RecreationAreaSelect recreationAreas={recreationAreas} onSelectRecreationArea={handleSelectRecreationArea} />
            <CampgroundSelect
                campgrounds={campgrounds}
                onSelectCampground={handleSelectCampground}
            />
            <DaterangeSelect
                daterange={daterange}
                onSelectDaterange={handleSelectDaterange}
            />

            <Button variant={"outlined"} type="submit">
                Subscribe
            </Button>
        </form>
    );
};

export default SearchForm;
