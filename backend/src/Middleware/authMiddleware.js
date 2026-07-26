import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.User = verifyToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;
