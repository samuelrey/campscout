import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@mui/material";
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

    useEffect(() => {
        const g = async () => {
            const result = await getCampgrounds();
            const data = await result.json();
            setCampgrounds(data.campgrounds);
        };
        g();
    }, []);

    const handleSelectCampground = (campgroundId) => {
        setSelectedCampground(campgroundId);
    };

    const handleSelectDaterange = (daterange) => {
        setDaterange(daterange);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await createCampscout(
                selectedCampground,
                daterange.startDate,
                daterange.endDate
            );
            if (result === "Success") {
                alert("Success!");
            }
        } catch (error) {
            // something happened
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CampgroundSelect
                selectedCampground={selectedCampground}
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
