import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../configs/index.js";

const requireAuth = (req, res, next) => {
  const token = req.session?.jwt;
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.redirect("/login?error=Session expired");
  }
};

export { requireAuth };
