import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { pool } from "../db.js";
import { JWT_SECRET, RECAPTCHA_SITE_KEY } from "../configs/index.js";

const authController = {
  // REGISTER
  getRegister: async (req, res) => res.render("register"),
  postRegister: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      // Check existing user
      const userExists = await pool.query(
        "SELECT * FROM users WHERE email = $1 OR username = $2",
        [email, username]
      );

      if (userExists.rows.length > 0) {
        return res.render("register", {
          error: "Username or email already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
        [username, email, hashedPassword]
      );

      res.render("login", {
        success: "Registration successful! Please login",
      });
    } catch (err) {
      console.error(err);
      res.render("register", { error: "Registration failed" });
    }
  },

  // LOGIN
  getLogin: (req, res) => {
    res.render("login", { recaptchaSiteKey: RECAPTCHA_SITE_KEY });
  },
  postLogin: async (req, res) => {
    const { identifier, password } = req.body;
    try {
      // Find user
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1 OR email = $1",
        [identifier]
      );
      const user = result.rows[0];
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.render("login", { error: "Invalid credentials" });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: "15m" }
      );

      req.session = { jwt: token };
      res.redirect("/profile");
    } catch (err) {
      res.render("login", { error: err.message });
    }
  },

  // LOGOUT
  logout: (req, res) => {
    req.session = null;
    res.redirect("/login");
  },

  // PROFILE
  getProfile: async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, username, email, created_at FROM users WHERE id = $1",
        [req.user.id]
      );

      res.render("profile", { user: result.rows[0] });
    } catch (err) {
      res.redirect("/login?error=Profile load failed");
    }
  },
};

export default authController;
