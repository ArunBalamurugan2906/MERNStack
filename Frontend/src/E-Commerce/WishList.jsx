import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "./Store/reducer";
import { MdDeleteForever } from "react-icons/md";

const WishList = () => {
  let products = useSelector((state) => {
    return state.cart;
  });
  let dispatch = useDispatch();
  let handleDelete = (id) => {
    dispatch(removeItem(id));
  };
  return (
    <div>
      <center>
        <h1>WishList</h1>
      </center>
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
                style={{ width: "9rem", height: "15rem" }}
              />
            </center>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
            </Card.Body>
            <Card.Footer
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="danger"
                onClick={() => {
                  handleDelete(product._id);
                }}
              >
                <MdDeleteForever />
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default WishList;
