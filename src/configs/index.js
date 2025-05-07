import { config } from "dotenv";
config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const DB_URL = process.env.DB_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;
export const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
