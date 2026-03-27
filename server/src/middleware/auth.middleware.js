import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(400)
      .json({ message: "Missing or invalid authorization header." });
  }

  const userToken = authHeader.split(" ")[1];

  jwt.verify(userToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token." });
    }

    req.user = { id: decoded.id };
    next();
  });
}
