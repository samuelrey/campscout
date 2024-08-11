import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FormControl, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getCampgrounds, createCampscout } from "../services/campscout";
import CampgroundSelect from "./CampgroundSelect";

const today = dayjs();
const tomorrow = dayjs().add(1, "day");

const SearchForm = () => {
    const [campground, setCampground] = useState("");
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);
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

    const handleStartDateChange = (event) => {
        setStartDate(event);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event);
    };

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

            <FormControl fullWidth sx={{ "margin-bottom": 12 }}>
                <DatePicker
                    label="Start Date"
                    openTo="month"
                    views={["year", "month", "day"]}
                    disablePast={true}
                    defaultValue={startDate}
                    onChange={(newDate) => {
                        handleStartDateChange(newDate);
                    }}
                />
            </FormControl>

            <FormControl fullWidth sx={{ "margin-bottom": 12 }}>
                <DatePicker
                    label="End Date"
                    openTo="month"
                    views={["year", "month", "day"]}
                    disablePast={true}
                    defaultValue={endDate}
                    minDate={startDate.add(1, "day")}
                    onChange={handleEndDateChange}
                />
            </FormControl>

            <Button variant={"outlined"} type="submit">
                Subscribe
            </Button>
        </form>
    );
};

export default SearchForm;
