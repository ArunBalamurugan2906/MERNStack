import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  let [updateProduct, setNewProduct] = useState(null);
  let navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/searchProduct/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setNewProduct(response.data.getProduct);
      });
  }, []);
  let handleUpdate = (e) => {
    let { name, value } = e.target;
    let data = name.split("rating.")[1];
    if (name.includes("rating.")) {
      setNewProduct({
        ...updateProduct,
        rating: {
          ...updateProduct.rating,
          [data]: value,
        },
      });
    } else {
      setNewProduct({
        ...updateProduct,
        [name]: value,
      });
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.put(
        `http://localhost:5000/api/updateProduct/${id}`,
        updateProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      toast.success("Updated Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
  };
  if (updateProduct !== null) {
    return (
      <div>
        <Paper elevation={20} style={paperStyle}>
          <Typography variant="h5">Update Product</Typography>
          <Grid
            component={"form"}
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: "20px" }}
          >
            <TextField
              value={updateProduct.title}
              name="title"
              label="title"
              variant="outlined"
              onChange={handleUpdate}
            />
            <TextField
              value={updateProduct.category}
              name="category"
              label="Category"
              variant="outlined"
              onChange={handleUpdate}
            />
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  value={updateProduct.rating.rate}
                  name="rating.rate"
                  label="rate"
                  type="number"
                  variant="outlined"
                  onChange={handleUpdate}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  value={updateProduct.rating.count}
                  name="rating.count"
                  label="count"
                  type="number"
                  variant="outlined"
                  onChange={handleUpdate}
                />
              </Grid>
            </Grid>
            <Button type="submit">Submit</Button>
            <Button onClick={() => navigate("/product")}>
              Return to products
            </Button>
          </Grid>
        </Paper>
      </div>
    );
  } else {
    return <h2>Loading</h2>;
  }
};

export default UpdateProduct;
