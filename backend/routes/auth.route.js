import express from "express";
import { login, logout, signup, getCurrentUser } from "../controllers/auth.controller.js"; // for importing automatically just press ctrl+space on signup variable. Also dont forget to add .js in this line else it will crash.
import { protectRoute } from "../milldleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protectRoute, getCurrentUser); // Here getCurrentUser will run only after protectRoue has run. This makes sure the authentication of the user. proctectRoute is a middleware.

export default router;