import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; // For hashing password.

export const signup = async(req, res) => {
    try {
        const {name, username, email, password} = req.body;
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message: "Email already exists"});
        }

        const existingUserName = await User.findOne({username});
        if(existingEmail){
            return res.status(400).json({message: "Username already exists"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"});
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

    } catch (error) {
        
    }
}

export const login = (req, res) => {
    res.send("login");
}

export const logout = (req, res) => {
    res.send("logout");
}