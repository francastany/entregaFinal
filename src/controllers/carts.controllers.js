import { cartsService } from "../DAO/index.js";

const instertToCart = async (req, res) => {
    const user = req.user;
    const cart = await cartsService.getCartById(user.cart);
    const stickerId = req.params.sid;
    const exists = cart.stickers.find(
        (sticker) => sticker._id.toString() === stickerId
    );
    if (exists) {
        cart.stickers[exists] = {
            ...exists,
            qty: exists.qty++,
        };
        await cartsService.updateCart(cart._id, { stickers: cart.stickers });
        res.send("Quantity updated!");
        // return res.status(400).send({ status: "Product already in the cart" });
    } else {
        cart.stickers.push({ _id: stickerId });
        await cartsService.updateCart(cart._id, { stickers: cart.stickers });
        res.send("Sticker added!");
    }
};
const generateOrder = async (req, res) => {
    //¡ TODO: MAILING TO THE USER !
    const user = req.user;
    const cart = await cartsService.getCartById(user.cart, { populate: true });
    res.json({
        message: `Thank you for your buy, ${user.name}`,
        products: cart.stickers,
    });
};

export default {
    instertToCart,
    generateOrder,
};
