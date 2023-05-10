import userModel from "./Mongo/models/User.js";
export default class UserDAO {
    getUsers = (params) => {
        return userModel.find(params).lean();
    };
    getUserBy = (params) => {
        return userModel.findOne(params).lean();
    };
    createUser = (user) => {
        return userModel.create(user);
    };
    updateUser = (id, user) => {
        return userModel.findByIdAndUpdate(id, { $set: user });
    };
}
