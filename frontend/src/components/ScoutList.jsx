import React, { useEffect, useState } from "react";
import { getCampscouts } from "../services/campscout";
import { List, ListItem, ListItemText } from "@mui/material";

const ScoutList = () => {
    const [scouts, setScouts] = useState([]);

    useEffect(() => {
        const fetchScouts = async () => {
            try {
                const results = await getCampscouts();
                const data = await results.json();
                setScouts(data.scouts);
            } catch (error) {
            } finally {
            }
        };

        fetchScouts();
    }, []);

    return (
        <List>
            {scouts.map((scout) => {
                const startDate = new Date(
                    scout.start_date
                ).toLocaleDateString();
                const endDate = new Date(scout.end_date).toLocaleDateString();
                const created = new Date(scout.created_at).toLocaleString();

                return (
                    <ListItem>
                        <ListItemText
                            primary={`${scout.facility_name}: From ${startDate} To ${endDate}`}
                            secondary={`Created at ${created}`}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default ScoutList;
