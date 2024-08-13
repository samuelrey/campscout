import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Alert, AlertTitle, Button } from "@mui/material";
import { getCampgrounds, createCampscout } from "../services/campscout";
import CampgroundSelect from "./CampgroundSelect";
import DaterangeSelect from "./DateRangeSelect";

const today = dayjs();

const SearchForm = () => {
    const [campgrounds, setCampgrounds] = useState([]);
    const [selectedCampground, setSelectedCampground] = useState("");
    const [daterange, setDaterange] = useState({
        startDate: today,
        endDate: today.add(1, "day"),
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampgrounds = async () => {
            try {
                const result = await getCampgrounds();
                const data = await result.json();
                setCampgrounds(data.campgrounds);
            } catch (error) {
                setError("Failed to get campgrounds.");
            }
        };
        fetchCampgrounds();
    }, []);

    const handleSelectCampground = (campground) => {
        setSelectedCampground(campground);
    };

    const handleSelectDaterange = (daterange) => {
        setDaterange(daterange);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await createCampscout(
                selectedCampground.id,
                daterange.startDate,
                daterange.endDate
            );
        } catch (error) {
            setError("Failed to create scout.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error !== null && <Alert severity="error">{error}</Alert>}
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
