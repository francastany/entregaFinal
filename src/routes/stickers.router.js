import { Router } from "express";
import stickersController from "../controllers/stickers.controller.js";
import uploader from "../services/uploader.js";

const router = Router();

router.get("/", stickersController.getStickers);
router.post("/", uploader.single("image"), stickersController.createSticker);

export default router;
