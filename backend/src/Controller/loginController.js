import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";
import bcrypt from "bcryptjs";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.status(200).json({ message: "Login Successfully!", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default loginUser;
