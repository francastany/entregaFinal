import {
    cartsService,
    historiesService,
    ticketsService,
    usersService,
} from "../DAO/index.js";
import config from "../config/config.js";
import { makeID } from "../utils.js";
import { transporter } from "../services/mailer.js";
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

    let mailOrder = "";
    for (const product of cart.stickers) {
        mailOrder += `<div> <h2>${product._id.title}</h2> <h4>Price: $ ${product._id.price}</h4> <h4>Quantity: ${product.qty}</h4> </div>`;
    }

    const result = await transporter.sendMail({
        from: `The Sticker Hub <${config.mailer.GMAIL_USER}>`,
        to: [config.mailer.GMAIL_USER, user.email],
        subject: `NEW ORDER BY ${user.first_name} ${user.last_name}`,
        html: `
        <div>
            <h2>ORDER: </h2>
            ${mailOrder}
        </div>
        `,
    });
    res.redirect("/buy");
};

export default {
    instertToCart,
    generateOrder,
};
