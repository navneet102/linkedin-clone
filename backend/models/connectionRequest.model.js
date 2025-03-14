import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recepient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        defautl: "pending",
    },
}, {timestamps: true});

const connectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);
export default connectionRequest;