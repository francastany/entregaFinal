import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { cartsService, usersService } from "../DAO/index.js";
import UserDTO from "../DAO/DTO/UserDTO.js";
import { createHash } from "../services/auth.js";

const register = async (req, res) => {
    try {
        const file = req.file;
        if (!file)
            return res.status(500).send({
                status: "error",
                error: "Error trying to load the file",
            });
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password)
            return res
                .status(400)
                .send({ status: "error", error: "Incomplete values" });
        const exists = await usersService.getUserBy({ email });
        if (exists)
            return res.status(400).send({
                status: "error",
                message: "The user already exists",
            });
        const hashedPassword = await createHash(password);
        const cart = await cartsService.createCart();
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            cart: cart._id,
            avatar: `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`,
        };
        const result = await usersService.createUser(user);
        res.send({ status: "success", message: "User registered" });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const userToken = UserDTO.getTokenDTO(req.user);
        const token = jwt.sign(userToken, config.jwt.SECRET, {
            expiresIn: "1d",
        });
        res.cookie(config.jwt.COOKIE, token).send({
            status: "success",
            message: "Logged!",
        });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Server error" });
    }
};

const loginFail = (req, res) => {
    res.send("Something went wrong... =(");
};

export default {
    register,
    login,
    loginFail,
};
