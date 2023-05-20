import UserDAO from "./userDAO.js";
import StickersDAO from "./StickersDAO.js";
import CartsDAO from "./CartsDAO.js";
import HistoriesDAO from "./HistoryDAO.js";
import TicketsDAO from "./TicketsDAO.js";
import KeysDAO from "./KeysDAO.js";

export const usersService = new UserDAO();
export const stickersService = new StickersDAO();
export const cartsService = new CartsDAO();
export const historiesService = new HistoriesDAO();
export const ticketsService = new TicketsDAO();
export const keysService = new KeysDAO();
