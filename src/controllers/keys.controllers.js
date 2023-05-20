import { keysService } from "../DAO/index.js";
import { DateTime } from "luxon";
import { makeID } from "../utils.js";

const getKeys = async (req, res) => {
    const result = await keysService.getKeys();
    res.send({ status: "success", payload: result });
};

const getKeyById = async (req, res) => {
    const keyId = req.params.id;
    const result = await keysService.getKeyBy({ _id: keyId });
    res.send({ status: "success", payload: result });
};

const createKey = async (req, res) => {
    const expiration = DateTime.now().plus({ months: 1 }).toISODate();
    const key = {
        expires: expiration,
        keyCode: makeID(25),
    };
    const result = await keysService.createKey(key);
    res.send({ status: "success", payload: result });
};
export default {
    createKey,
    getKeyById,
    getKeys,
};
