import { Router } from "express";

import authController from "../controllers/auth.controller.js";

import { requireAuth } from "../middlewares/auth.js";
import { verifyRecaptcha } from "../middlewares/verifyReCAPTCHA.js";

const router = Router();

router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

router.get("/login", authController.getLogin);
router.post("/login", verifyRecaptcha, authController.postLogin);

router.get("/logout", authController.logout);

router.get("/profile", requireAuth, authController.getProfile);

export { router as authRouter };
