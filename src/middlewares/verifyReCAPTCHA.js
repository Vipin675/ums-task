import axios from "axios";

import { RECAPTCHA_SECRET_KEY } from "../configs/index.js";

// https://developers.google.com/recaptcha/docs/verify
const verifyRecaptcha = async (req, res, next) => {
  const recaptchaResponse = req.body["g-recaptcha-response"];

  console.log({ recaptchaResponse });

  if (!recaptchaResponse) {
    return res.status(400).render("login", {
      error: "Please complete the reCAPTCHA verification",
    });
  }

  try {
    const verification = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: recaptchaResponse,
          remoteip: req.ip,
        },
      }
    );

    if (!verification.data.success) {
      return res.status(400).render("login", {
        error: "reCAPTCHA verification failed. Please try again.",
      });
    }

    next();
  } catch (error) {
    console.error("reCAPTCHA Error:", error);
    res.status(500).render("login", {
      error: "Error verifying reCAPTCHA. Please try again later.",
    });
  }
};

export { verifyRecaptcha };
