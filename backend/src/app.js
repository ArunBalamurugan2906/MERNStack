import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoute from "./Router/productRoute.js";
import authRoute from "./Router/register_login.js";
dotenv.config();
connectDB();
const PORT = 5000;
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api", productRoute);
app.use("/api", authRoute);

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
