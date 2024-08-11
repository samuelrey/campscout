import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CampgroundSelect = ({
    campgrounds,
    selectedCampground,
    onSelectCampground,
}) => {
    const handleChange = (e) => {
        onSelectCampground(e.target.value);
    };

    return (
        <FormControl fullWidth required sx={{ marginBottom: 2 }}>
            <InputLabel>Campground</InputLabel>
            <Select
                value={selectedCampground}
                label="Campground"
                onChange={handleChange}
            >
                {campgrounds.map(({ facility_id, facility_name }) => (
                    <MenuItem key={facility_id} value={facility_id}>
                        {facility_name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CampgroundSelect;
