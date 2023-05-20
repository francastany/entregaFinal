import { Router } from "express";
import keysController from "../controllers/keys.controllers.js";

const router = Router();

router.get("/", keysController.getKeys);
router.get("/:kid", keysController.getKeyById);
router.post("/", keysController.createKey);

export default router;
