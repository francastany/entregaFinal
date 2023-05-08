import UserDAO from "./userDAO.js";
import StickersDAO from "./StickersDAO.js";
import CartsDAO from "./CartsDAO.js";

export const usersService = new UserDAO();
export const stickersService = new StickersDAO();
export const cartsService = new CartsDAO();
