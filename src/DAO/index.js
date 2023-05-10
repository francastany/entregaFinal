import UserDAO from "./userDAO.js";
import StickersDAO from "./StickersDAO.js";
import CartsDAO from "./CartsDAO.js";
import HistoriesDAO from "./HistoryDAO.js";
import TicketsDAO from "./TicketsDAO.js";

export const usersService = new UserDAO();
export const stickersService = new StickersDAO();
export const cartsService = new CartsDAO();
export const historiesService = new HistoriesDAO();
export const ticketsService = new TicketsDAO();
