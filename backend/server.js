import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js"

dotenv.config(); // configure dotenv to allow us to read from process.env
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/v1/auth", authRoutes);  // configure routes. /v1 is used for version control.

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})