import express from "express";
import { protectRoute } from "../milldleware/auth.middleware.js";
import { getSuggestedConnections } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/suggestions", protectRoute, getSuggestedConnections);

export default router;