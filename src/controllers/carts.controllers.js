import {
    cartsService,
    historiesService,
    ticketsService,
    usersService,
} from "../DAO/index.js";
import { makeID } from "../utils.js";
import { DateTime } from "luxon";

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
        res.redirect("/cart");
        // return res.status(400).send({ status: "Product already in the cart" });
    } else {
        cart.stickers.push({ _id: stickerId });
        await cartsService.updateCart(cart._id, { stickers: cart.stickers });
        res.redirect("/cart");
    }
};
const generateOrder = async (req, res) => {
    const user = await usersService.getUserBy({ _id: req.user.id });
    const cart = await cartsService.getCartById(user.cart, { populate: true });
    const unpopulatedCart = await cartsService.getCartById(user.cart);
    console.log(unpopulatedCart);
    const total = cart.stickers.reduce(
        (acum, sticker) => acum + sticker._id.price * sticker.qty,
        0
    );

    const ticket = {
        user: user._id,
        stickers: unpopulatedCart.stickers,
        total: total,
        code: makeID(20),
    };

    await cartsService.updateCart(cart._id, { stickers: [] });
    await ticketsService.createTicket(ticket);
    const history = await historiesService.getHistoriesBy({ user: user._id });
    const event = {
        event: "Purchase",
        date: DateTime.now().toISO(),
        description: `Bought ${
            cart.stickers.length > 1
                ? `${cart.stickers.length} different stickers`
                : "one sticker."
        }`,
    };
    if (!history) {
        await historiesService.createHistory({
            user: user._id,
            events: [event],
        });
    } else {
        history.events.push(event);
        await historiesService.updateHistory(history._id, {
            events: history.events,
        });
    }

    //¡ TODO: MAILING TO THE USER !

    res.json({
        message: `Thank you for your buy, ${user.first_name}`,
        products: cart.stickers,
        total: total,
    });
};

export default {
    instertToCart,
    generateOrder,
};
