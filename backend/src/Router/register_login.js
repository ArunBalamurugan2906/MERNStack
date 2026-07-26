import express from "express";
import loginUser from "../Controller/loginController.js";
import userRegister from "../Controller/registerController.js";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", loginUser);

export default router;
