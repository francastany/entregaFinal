import mongoose from "mongoose";

const collection = "Keys";
const schema = new mongoose.Schema(
    {
        keyCode: String,
        type: {
            type: String,
            default: "free",
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users",
        },
        expires: {
            type: Date,
        },
        usagesLeft: {
            type: Number,
            default: 10,
        },
        status: {
            type: String,
            default: "active",
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const keysModel = mongoose.model(collection, schema);
export default keysModel;
