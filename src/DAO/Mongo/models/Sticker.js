import mongoose from "mongoose";

const collection = "Stickers";
const schema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    code: {
        type: String,
        unique: true,
    },
    stock: Number,
    image: String,
});

const stickersModel = mongoose.model(collection, schema);
export default stickersModel;
