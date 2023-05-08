import { cartsService, stickersService } from "../DAO/index.js";

const home = async (req, res) => {
    const stickers = await stickersService.getStickers();
    res.render("home", { stickers, user: req.user });
};
const login = (req, res) => {
    res.render("login");
};
const register = (req, res) => {
    res.render("register");
};
const profile = (req, res) => {
    res.render("profile", { user: req.user });
};
const creator = (req, res) => {
    res.render("creator");
};
const cart = async (req, res) => {
    const name = req.user.name;
    const cartId = req.user.cart;
    const cart = await cartsService.getCartById(cartId, { populate: true });
    const stickers = cart.stickers.map((sticker) => ({
        ...sticker._id,
        qty: sticker.qty,
    }));
    const TOTALPRICE = stickers.reduce(
        (acum, sticker) => acum + sticker.price * sticker.qty,
        0
    );
    res.render("cart", {
        stickers,
        name,
        TOTALPRICE,
    });
};

export default {
    home,
    login,
    register,
    profile,
    creator,
    cart,
};
