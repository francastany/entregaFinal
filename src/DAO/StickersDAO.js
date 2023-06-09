import stickersModel from "./Mongo/models/Sticker.js";

export default class StickersDAO {
    getStickers = (params) => {
        return stickersModel.find(params).lean();
    };
    createSticker = (sticker) => {
        return stickersModel.create(sticker);
    };
    updateSticker = (id, sticker) => {
        return stickersModel.findByIdAndUpdate(id, { $set: sticker });
    };
}
