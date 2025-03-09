import express from "express";
import dotenv from "dotenv";

dotenv.config(); // configure dotenv to allow us to read from process.env
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})