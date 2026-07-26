import User from "../model/userSchema.js";
import bcrypt from "bcryptjs";

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const register = await User.findOne({ email });
    if (register) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({ message: "User Register Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default userRegister;
