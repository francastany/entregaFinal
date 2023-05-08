import mongoose from "mongoose";
const collection = "Carts";
const schema = new mongoose.Schema({
    stickers: [
        {
            _id: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Stickers",
            },
            qty: {
                type: Number,
                default: 1,
            },
        },
    ],
});
const cartModel = mongoose.model(collection, schema);
export default cartModel;
