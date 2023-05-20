import { Router } from "express";
import stickersController from "../controllers/stickers.controller.js";
import uploader from "../services/uploader.js";
import { handleKey } from "../middlewares/keys.js";

const router = Router();

router.use(handleKey);

router.get("/", stickersController.getStickers);
router.post("/", uploader.single("image"), stickersController.createSticker);

export default router;
