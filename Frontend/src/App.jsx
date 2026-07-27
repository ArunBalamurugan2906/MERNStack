import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./E-Commerce/Home";
import Signup from "./E-Commerce/Signup";
import Login from "./E-Commerce/Login";
import ProtectedRoute from "./E-Commerce/ProductedRoute";
import ProductList from "./E-Commerce/ProductList";
import Todo from "./E-Commerce/Todo";
import NewProduct from "./E-Commerce/NewProduct";
import UpdateProduct from "./E-Commerce/UpdateProduct";
import WishList from "./E-Commerce/WishList";
import Notfound from "./E-Commerce/Notfound";
import Reducer from "./E-Commerce/Reducer/Reducer";
import NavBar from "./E-Commerce/NavBar";

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify());
}
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />

          <Route path="/todo" element={<Todo />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/reducer" element={<Reducer />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  );
}

export default App;
