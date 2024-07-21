import { useState } from "react";
import "./App.css";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const today = dayjs();
const tomorrow = dayjs().add(1, "day");

function App() {
  const [age, setAge] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event);
  };

  return (
    <div className="App">
      <header className="App-header" />
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Age</InputLabel>
          <Select value={age} label="Age" onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            <DatePicker
              label="End Date"
              openTo="month"
              views={["year", "month", "day"]}
              disablePast={true}
              defaultValue={endDate}
              minDate={startDate.add(1, "day")}
              onChange={handleEndDateChange}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
    </div>
  );
}

export default App;
