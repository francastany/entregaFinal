import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import { executePolicies } from "../middlewares/auth.js";

const router = Router();

router.get("/", executePolicies(["user"]), viewsController.home);
router.get("/login", viewsController.login);
router.get("/register", viewsController.register);
router.get(
    "/profile",
    executePolicies(["AUTHENTICATED"]),
    viewsController.profile
);
router.get("/creator", viewsController.creator);
router.get("/cart", executePolicies(["user"]), viewsController.cart);

export default router;
