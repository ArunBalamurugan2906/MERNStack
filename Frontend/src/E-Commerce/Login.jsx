import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        user,
      );

      localStorage.setItem("token", response.data.token);

      toast.success("Login Successfully");

      navigate("/product");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
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
      <Typography variant="h5">Login</Typography>

      <Grid
        component="form"
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "20px" }}
      >
        <TextField
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <Button type="submit">Login</Button>
      </Grid>
    </Paper>
  );
};

export default Login;
