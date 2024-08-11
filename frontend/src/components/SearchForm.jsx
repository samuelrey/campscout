import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getCampgrounds, createCampscout } from "../services/campscout";
import CampgroundSelect from "./CampgroundSelect";
import DateRangeSelect from "./DateRangeSelect";

const SearchForm = () => {
    const [campground, setCampground] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [campgrounds, setCampgrounds] = useState([]);

    useEffect(() => {
        const g = async () => {
            const result = await getCampgrounds();
            const data = await result.json();
            console.log(data.campgrounds);
            setCampgrounds(data.campgrounds);
        };
        g();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await createCampscout(
                campground,
                startDate,
                endDate
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
            <CampgroundSelect campgrounds={campgrounds} />
            <DateRangeSelect />

            <Button variant={"outlined"} type="submit">
                Subscribe
            </Button>
        </form>
    );
};

export default SearchForm;
