import { keysService } from "../DAO/index.js";

export const handleKey = async (req, res, next) => {
    const keyQuery = req.query.apiKey;
    if (!keyQuery) {
        return res
            .status(401)
            .send({ status: "error", message: "No key provided" });
    }
    const key = await keysService.getKeyBy({ keyCode: keyQuery });
    if (!key) {
        return res
            .status(401)
            .send({ status: "error", message: "Invalid Key" });
    }
    if (key.status !== "active") {
        return res
            .status(400)
            .send({ status: "error", message: "Deactivated Key" });
    }
    if (key.usagesLeft <= 0) {
        return res
            .status(400)
            .send({ status: "error", message: "No more usages left" });
    }
    key.usagesLeft--;
    if (key.usagesLeft <= 0) {
        //MAIL DE NO HAY MÁS USOS
    }
    await keysService.updateKey(key._id, { usagesLeft: key.usagesLeft });
    next();
};
