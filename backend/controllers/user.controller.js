import User from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js";

export const getSuggestedConnections = async (req, res) => {

    try {
        const currenUser = await User.findById(req.user._id).select("connections");  //get connections of current user.

        const suggestedUsers = await User.find({
            _id: {
                $ne: req.user._id, // Users not equal to the currect user.
                $nin: currenUser.connections // Users not already connected.
            }
        }).select("name username profilePicture headline").limit(3);


        res.json(suggestedUsers);
    } catch (error) {
        console.error("Error in getSuggestedUsers controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getPublicProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.jsor(user);
    } catch (error) {
        console.error("Error in getPublicProfile controller: ", error);
        res.stats(500).json({message: "Server error"});
    }
}

export const updateProfile = async (req, res) => {
    try {
        const allowedFields = [
            "name",
            "username",
            "headline",
            "about",
            "location",
            "profilePicture",
            "bannerImg",
            "skills",
            "experience",
            "education"
        ];

        const updatedData = {};


        for (const field in allowedFields){
            if(req.body[field]){
                updatedData[field] = req.body[field];
            }
        }


        // todo check for the profile and banner image => cloudinary

        if(req.body.profilePicture){
            const result = await cloudinary.uploader.upload(req.body.profilePicture);
            updatedData.profilePicture = result.secure_url;
        }

        if(req.body.bannerImg){
            const result = await cloudinary.uploader.upload(req.body.bannerImg);
            updatedData.bannerImg = result.secure_url;
        }


        const user = await User.findByIdAndUpdate(req.user._id, {$set: updatedData}, {new: true}).select("-password");  //Here new: true is set so that this funtions returns the user after updating the values and not the old data(by default)

        res.json(user);
    } catch (error) {
        console.error("Error in updatProfile controller: ", error);
        res.status(500).json({message: "Server error"});
    }
}