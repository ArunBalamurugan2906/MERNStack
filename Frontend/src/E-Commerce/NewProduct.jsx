import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewProduct = () => {
  let [newProduct, setNewProduct] = useState({
    title: "",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 0,
      count: 0,
    },
  });
  let navigate = useNavigate();

  let handleChange = (e) => {
    let { name, value } = e.target;
    let data = name.split("rating.")[1];
    if (name.includes("rating.")) {
      setNewProduct({
        ...newProduct,
        rating: {
          ...newProduct.rating,
          [data]: value,
        },
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        "http://localhost:5000/api/createProduct",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Producted added Successfully");

      setNewProduct({
        title: "",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        rating: {
          rate: 0,
          count: 0,
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Somthing went wrong");
    }
  };

  let paperStyle = {
    width: 400,
    margin: "20px auto",
    textAlign: "center",
    padding: "20px",
  };
  return (
    <div>
      <Paper elevation={20} style={paperStyle}>
        <Typography variant="h5">Create New Product</Typography>
        <Grid
          component={"form"}
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "20px" }}
        >
          <TextField
            value={newProduct.title}
            name="title"
            label="title"
            variant="outlined"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <TextField
            value={newProduct.category}
            name="category"
            label="category"
            variant="outlined"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                value={newProduct.rating.rate}
                name="rating.rate"
                label="rate"
                type="number"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                value={newProduct.rating.count}
                name="rating.count"
                label="count"
                type="number"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
          </Grid>
          <Button type="submit">Submit</Button>
          <Button onClick={() => navigate("/product")}>
            Return to product{" "}
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default NewProduct;
