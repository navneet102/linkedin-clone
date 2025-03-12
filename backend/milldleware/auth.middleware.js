import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-likedin"]; //cookie parser in server.js is used for this.

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password"); //This is the same userId in jwt token in signup controller. Select -password do not sends password as response, as it is not required.

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; //It is important to do this as this means that user is verified and req.user is the same who is requesting any function. So we can skip protectRoute check if it is already present.

        next();

    } catch (error) {
        console.log("Error in protectRoute: middleware", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};