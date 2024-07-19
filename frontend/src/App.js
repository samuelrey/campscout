import { useState } from "react";
import "./App.css";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function App() {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header" />
      <body>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>Age</InputLabel>
            <Select value={age} label="Age" onChange={handleChange}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </body>
    </div>
  );
}

export default App;
