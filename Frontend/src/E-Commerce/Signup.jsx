import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!user.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!user.email.includes("@")) {
      newErrors.email = "Invalid Email";
    }

    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        user,
      );

      toast.success("Registration Successful");

      setUser({
        name: "",
        email: "",
        password: "",
      });

      setErrors({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const paperStyle = {
    width: 400,
    margin: "20px auto",
    textAlign: "center",
    padding: "20px",
  };

  return (
    <Paper elevation={20} style={paperStyle}>
      <Typography variant="h5">SignUp</Typography>

      <Grid
        component="form"
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "20px" }}
      >
        <TextField
          label="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />

        <TextField
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />

        <Button type="submit">Submit</Button>

        <Button onClick={() => navigate("/login")}>Already Login</Button>
      </Grid>
    </Paper>
  );
};

export default Signup;
