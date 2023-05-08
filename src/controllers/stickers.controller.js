import { stickersService } from "../DAO/index.js";

const getStickers = async (req, res) => {
    const stickers = await stickersService.getStickers();
    res.send({ status: "success", payload: stickers });
};

const createSticker = async (req, res) => {
    const file = req.file;
    const { title, description, code, price, stock } = req.body;
    if (!title || !description || !code || !price || !stock)
        return res
            .status(400)
            .send({ status: "error", meessage: "Incomplete values" });
    const sticker = {
        title,
        description,
        code,
        price,
        stock,
        image: `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`,
    };
    const result = await stickersService.createSticker(sticker);
    res.send({ status: "success", message: "Sticker created" });
};

export default {
    getStickers,
    createSticker,
};
