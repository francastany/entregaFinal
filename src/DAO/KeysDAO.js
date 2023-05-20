import keysModel from "./Mongo/models/Key.js";
export default class KeysDAO {
    getKeys = (params) => {
        return keysModel.find(params).lean();
    };
    getKeyBy = (params) => {
        return keysModel.findOne(params).lean();
    };
    createKey = (key) => {
        return keysModel.create(key);
    };
    updateKey = (id, key) => {
        return keysModel.findByIdAndUpdate(id, { $set: key });
    };
}
