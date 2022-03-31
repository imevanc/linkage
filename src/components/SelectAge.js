import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
const acceptedAges = range(19, 100, 1);

const SelectAge = (props) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    props.setAge(event.target.value);
  };

  return (
    <div>
      <FormControl required sx={{ minWidth: 120 }}>
        <InputLabel id="required-label">Age</InputLabel>
        <Select
          labelId="required-label"
          id="select-required"
          value={age}
          label="Age *"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {acceptedAges.map((age, idx) => {
            return (
              <MenuItem value={age} key={idx}>
                {age}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectAge;
