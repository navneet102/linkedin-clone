import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; // For hashing password.
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const existingUserName = await User.findOne({ username });
        if (existingUserName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            username,
        })

        await user.save(); // .save() function is provided to each model in mongoose. To save it. Here user is object of User class/model

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" }); //generates jwt token for a user.

        res.cookie("jwt-linkedin", token, {
            httpOnly: true,  // prevent XSS cross site scripting don't allow javascript to access token
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict", //prevent CSRF attack
            secure: process.env.NODE_ENV === "production", // HTTPS on production and HTTP on dev mode. Prevents man in the middle.
        })

        res.status(201).json({ message: "User registered sucessfully" });

        // todo : send email

    } catch (error) {
        console.log("Error in signup: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = (req, res) => {
    res.send("login");
}

export const logout = (req, res) => {
    res.send("logout");
}