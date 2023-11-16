import React from "react";
import styles from "./AddressDetails.module.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
const AddressDetails = () => {
    const handleSubmit = () =>{
        
    }
  return (
    <div className={styles.addressDetailsContainer}>
      <h2>Address details</h2>
      <div className={styles.innerContainer}>
        <TextField
          className={styles.input}
          id="standard-basic"
          label="Address"
          variant="standard"
        />
        <TextField
          className={styles.input}
          id="standard-basic"
          label="Pincode"
          variant="standard"
        />
        <div className={styles.selectInputs}>
          <FormControl sx={{ m: 1, minWidth: 120, width: 200 }}>
            <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              //   value={age}
              label="State"
              //   onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120, width: 200 }}>
            <InputLabel id="demo-simple-select-helper-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              //   value={age}
              label="City"
              //   onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
          </FormControl>
        </div>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default AddressDetails;
