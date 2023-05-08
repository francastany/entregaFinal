import { Router } from "express";
import cartsControllers from "../controllers/carts.controllers.js";
import { executePolicies } from "../middlewares/auth.js";

const router = Router();

router.get(
    "/sticker/:sid",
    executePolicies(["user"]),
    cartsControllers.instertToCart
);
router.get(
    "/generateOrder",
    executePolicies(["user"]),
    cartsControllers.generateOrder
);

export default router;
