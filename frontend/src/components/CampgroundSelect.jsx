import React from "react";
import { FormControl, TextField, Autocomplete } from "@mui/material";

const CampgroundSelect = ({ campgrounds, onSelectCampground }) => {
    const campgroundOptions = campgrounds.map((campground) => {
        return {
            label: campground.facility_name,
            id: campground.facility_id,
        };
    });
    campgroundOptions.sort((a, b) => {
        if (a.label < b.label) {
            return -1;
        }
        return 1;
    });

    const handleChange = (campground) => {
        onSelectCampground(campground);
    };

    return (
        <FormControl fullWidth required sx={{ marginBottom: 2 }}>
            <Autocomplete
                options={campgroundOptions}
                renderInput={(params) => {
                    return <TextField {...params} label="Campground" />;
                }}
                onChange={(_, value) => {
                    handleChange(value);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
            />
        </FormControl>
    );
};

export default CampgroundSelect;
