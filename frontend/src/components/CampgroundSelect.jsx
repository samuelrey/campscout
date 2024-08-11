import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CampgroundSelect = ({ campgrounds }) => {
    const [selectedCampground, setSelectedCampground] = useState("");

    const handleChange = (e) => {
        setSelectedCampground(e.target.value);
    };

    return (
        <FormControl fullWidth sx={{ "margin-bottom": 12 }}>
            <InputLabel>Campground</InputLabel>
            <Select
                value={selectedCampground}
                label="Campground"
                onChange={handleChange}
            >
                {campgrounds.map(({ facility_id, facility_name }) => (
                    // campgrounds.map not a function. maybe make CampgroundSelector
                    <MenuItem key={facility_id} value={facility_id}>
                        {facility_name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CampgroundSelect;
