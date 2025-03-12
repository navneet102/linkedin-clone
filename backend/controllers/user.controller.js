import User from "../models/user.model.js"

export const getSuggestedConnections = async (req, res) => {

    try {
        const currenUser = await User.findById(req.user._id).select("connections");  //get connections of current user.

        const suggestedUsers = await User.find({
            _id:{
                $ne: req.user._id, // Users not equal to the currect user.
                $nin: currenUser.connections // Users not already connected.
            }
        }).select("name username profilePicture headline").limit(3);


        res.json(suggestedUsers);
    } catch (error) {
        console.error("Error in getSuggestedUsers controller: ", error);
        res.status(500).json({message: "Server error"});
    }
}