import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getCampgrounds, createCampscout } from "../services/campscout";
import CampgroundSelect from "./CampgroundSelect";
import DaterangeSelect from "./DateRangeSelect";

const SearchForm = () => {
    const [campgrounds, setCampgrounds] = useState([]);
    const [selectedCampground, setSelectedCampground] = useState(null);
    const [selectedDaterange, setSelectedDaterange] = useState(null);

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
        setSelectedDaterange(daterange);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await createCampscout(
                selectedCampground,
                selectedDaterange.startDate,
                selectedDaterange.endDate
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
                campgrounds={campgrounds}
                onSelectCampground={handleSelectCampground}
            />
            <DaterangeSelect onSelectDaterange={handleSelectDaterange} />

            <Button variant={"outlined"} type="submit">
                Subscribe
            </Button>
        </form>
    );
};

export default SearchForm;
