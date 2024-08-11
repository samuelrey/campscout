import React, { useState } from "react";
import dayjs from "dayjs";
import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const today = dayjs();
const tomorrow = dayjs().add(1, "day");

const DaterangeSelect = ({ onSelectDaterange }) => {
    const [daterange, setDaterange] = useState({
        startDate: today,
        endDate: tomorrow,
    });

    const handleChange = (key, date) => {
        const newDaterange = { ...daterange, [key]: date };
        setDaterange(newDaterange);
        onSelectDaterange(newDaterange);
    };

    return (
        <>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <DatePicker
                    key="startDate"
                    label="Start Date"
                    openTo="month"
                    views={["year", "month", "day"]}
                    disablePast={true}
                    defaultValue={today}
                    onChange={(date) => {
                        handleChange("startDate", date);
                    }}
                />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <DatePicker
                    key="endDate"
                    label="End Date"
                    openTo="month"
                    views={["year", "month", "day"]}
                    disablePast={true}
                    defaultValue={tomorrow}
                    minDate={daterange.startDate.add(1, "day")}
                    onChange={(date) => {
                        handleChange("endDate", date);
                    }}
                />
            </FormControl>
        </>
    );
};

export default DaterangeSelect;
