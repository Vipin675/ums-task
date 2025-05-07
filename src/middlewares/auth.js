import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  const token = req.session?.jwt;
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.redirect("/login?error=Session expired");
  }
};

export { requireAuth };
