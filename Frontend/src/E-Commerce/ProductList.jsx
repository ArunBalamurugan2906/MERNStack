import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useFetch from "./CustomHook/useFetch";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./Store/reducer";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Mosaic } from "react-loading-indicators";
import { RiHeartAddFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";
const ProductList = () => {
  let navigation = useNavigate();
  let { products, error, isLoading, setProducts } = useFetch(
    "http://localhost:5000/api/allProducts",
  );
  let dispatch = useDispatch();
  let cartState = useSelector((state) => {
    return state.cart;
  });
  let addtoCart = (product) => {
    let checkPoint = cartState.some(
      (cartProduct) => cartProduct._id === product._id,
    );
    if (!checkPoint) {
      dispatch(addItem(product));

      Swal.fire({
        title: "Add to wishlist",
        icon: "success",
        draggable: true,
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Already added",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  let handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/deleteProduct/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        let deleteItem = products.filter((product) => product._id !== id);
        setProducts(deleteItem);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };
  if (error) {
    Swal.fire({
      title: "Please Check Connection?",
      icon: "question",
    });
  }
  if (isLoading) {
    return (
      <center>
        <Mosaic color="#313ecc" size="medium" text="" textColor="" />
      </center>
    );
  }
  return (
    <div>
      <h1>Product List</h1>
      <section className="button_icon">
        <IoCartOutline
          style={{ fontSize: "50px" }}
          onClick={() => {
            navigation("/wishlist");
          }}
        />

        <MdAddToPhotos
          style={{ fontSize: "40px", color: "#df56fa" }}
          onClick={() => navigation("/newProduct")}
        />

        <Button
          variant="danger"
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "You will be logged out from your account.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, Logout",
              cancelButtonText: "Cancel",
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem("token");

                Swal.fire({
                  title: "Logged Out!",
                  text: "You have been logged out successfully.",
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false,
                });

                setTimeout(() => {
                  navigation("/login");
                }, 1500);
              }
            });
          }}
        >
          Logout
        </Button>
      </section>
      <section className="products">
        {products.map((product) => (
          <Card
            key={product._id}
            style={{ width: "18rem" }}
            className="product"
          >
            <center>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ width: "9rem", height: "13rem" }}
              />
            </center>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
              <Card></Card>

              <section className="button">
                <Button
                  variant="primary"
                  onClick={() => {
                    addtoCart(product);
                  }}
                >
                  <RiHeartAddFill />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigation(`/update/${product._id}`);
                  }}
                >
                  <GrUpdate />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDelete(product._id);
                  }}
                >
                  <MdDeleteForever />
                </Button>
              </section>
            </Card.Body>
          </Card>
        ))}
        <p>{error}</p>
      </section>
    </div>
  );
};

export default ProductList;
