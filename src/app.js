import { fileURLToPath } from "url";
import path from "path";

import express from "express";
import cookieSession from "cookie-session";

import { authRouter } from "./routes/auth.route.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
    maxAge: 15 * 60 * 1000,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ROUTES
app.get("/", (req, res) => res.render("home"));
app.use(authRouter);

export { app };
