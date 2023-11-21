import React, { useState } from "react";
import styles from "./Register.module.css";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { openToaster } from "../../../stores/toasterSlice";
import { registerApi } from "../../../http";
import { setAuth } from "../../../stores/authSlice";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const handleSignup = async () => {
    setIsSubmiting(true);
    if (!userName || !email || !password || !confirmPassword || !role) {
      dispatch(
        openToaster({
          message: "All fields are mendatory",
          error: true,
          success: false,
        })
      );
      setIsSubmiting(false);
    }
    if (password !== confirmPassword) {
      dispatch(
        openToaster({
          message: "password is not matching",
          error: true,
          success: false,
        })
      );
      setIsSubmiting(false);
    }

    try {
      const { data } = await registerApi({
        username: userName,
        email,
        password,
        role: role.toLowerCase(),
      });
      console.log(data);
      if (data && data.success) {
        dispatch(
          openToaster({
            message: "SignedIn successfully",
            error: false,
            success: true,
          })
        );
      }
      setIsSubmiting(false);
      dispatch(setAuth(data));
      if(data.data.role === 'hotel'){
        navigate('/hotel-details');
      }
      if(data.data.role === 'customer'){
        navigate('/hotels');
      }
    } catch (error) {
      setIsSubmiting(false);
      dispatch(
        openToaster({
          message: error.response ? error.response.data.message : error.message,
          error: true,
          success: false,
        })
      );
    }
  };
  return (
    <div className={styles.registerWrapper}>
      <h2>Signup</h2>
      <div className={styles.registerInnerWrapper}>
        <div className={styles.inputContainers}>
          <TextField
            id="username"
            value={userName}
            label="User name"
            variant="standard"
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            id="email"
            value={email}
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputContainers}>
          <TextField
            id="Password"
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="Confirm-Password"
            label="Confirm Password"
            variant="standard"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"customer"}>Customer</MenuItem>
            <MenuItem value={"hotel"}>Hotel</MenuItem>
          </Select>
        </FormControl>
        {!isSubmiting ? (
          <Button variant="contained" onClick={handleSignup}>Signup</Button>
        ) : (
          <CircularProgress />
        )}

        <p>
          Already have an account ? <Link to={"/signin"}>Signin</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
