import jwt from "jsonwebtoken";

const checkAuthentication = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({
      error: "Unauthorized request",
    });
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

export default checkAuthentication;
