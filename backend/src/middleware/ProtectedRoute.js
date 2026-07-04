import jwt from "jsonwebtoken";

const protectedRoute = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("Token:", token);
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    req.user = decoded;
    console.log("Decoded:", decoded);
    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default protectedRoute;
