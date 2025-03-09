import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js"; // for importing automatically just press ctrl+space on signup variable. Also dont forget to add .js in this line else it will crash.

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;