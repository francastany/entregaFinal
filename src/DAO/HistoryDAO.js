import historyModel from "./Mongo/models/History.js";

export default class HistoriesDAO {
    getHistories = () => {
        return historyModel.find().lean();
    };
    getHistoriesBy = (params) => {
        return historyModel.findOne(params).lean();
    };
    createHistory = (history) => {
        return historyModel.create(history);
    };
    updateHistory = (id, history) => {
        return historyModel.findOneAndUpdate(id, { $set: history });
    };
}
