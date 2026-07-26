import express from "express";
import {
  createProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from "../Controller/productController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const router = express.Router();

router.post("/createProduct", authMiddleware, createProduct);
router.get("/allProducts", authMiddleware, getAllProduct);
router.get("/searchProduct/:id", authMiddleware, getOneProduct);
router.put("/updateProduct/:id", authMiddleware, updateProduct);
router.delete("/deleteProduct/:id", authMiddleware, deleteProduct);

export default router;
