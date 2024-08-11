import React from "react";
import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DaterangeSelect = ({ daterange, onSelectDaterange }) => {
    const handleChange = (key, date) => {
        const newDaterange = { ...daterange, [key]: date };
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
                    defaultValue={daterange.startDate}
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
                    defaultValue={daterange.startDate.add(1, "day")}
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
