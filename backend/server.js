import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js"

dotenv.config(); // configure dotenv to allow us to read from process.env
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //parse JSON request bodies
app.use(cookieParser()); //helps in parsing cookies

app.use("/api/v1/auth", authRoutes);  // configure routes. /v1 is used for version control.

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDB();
})