import React from "react";
import useFetch from "./CustomHook/useFetch";

const Home = () => {
  let { products } = useFetch("http://localhost:5000/api/allProducts");
  return (
    <div className="shop">
      <div>
        <center>
          <h1>Welcome to Our Shop</h1>
          <h2>Total Products - {products.length}</h2>
        </center>
      </div>
    </div>
  );
};

export default Home;
