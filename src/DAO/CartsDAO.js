import cartModel from "./Mongo/models/Cart.js";
export default class CartsDAO {
    getCartById = (id, options = {}) => {
        if (options.populate)
            return cartModel
                .findOne({ _id: id })
                .populate("stickers._id")
                .lean();
        return cartModel.findOne({ _id: id }).lean();
    };
    createCart = () => {
        return cartModel.create({ stickers: [] });
    };
    updateCart = (id, cart) => {
        return cartModel.findByIdAndUpdate(id, { $set: cart });
    };
}
