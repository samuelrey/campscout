import React from "react";
import { FormControl, TextField, Autocomplete } from "@mui/material";

const RecreationAreaSelect = ({ recreationAreas, onSelectRecreationArea }) => {
    const options = recreationAreas.map((area, index) => {
        return {
            label: area,
            id: index,
        };
    });
    options.sort((a, b) => {
        if (a.label < b.label) {
            return -1;
        }
        return 1;
    });

    const handleChange = (recreationArea) => {
        onSelectRecreationArea(recreationArea);
    };

    return (
        <FormControl fullWidth required sx={{ marginBottom: 2 }}>
            <Autocomplete
                options={options}
                renderInput={(params) => {
                    return <TextField {...params} label="Recreation Area" />;
                }}
                onChange={(_, value) => {
                    handleChange(value);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
            />
        </FormControl>
    );
};

export default RecreationAreaSelect;
