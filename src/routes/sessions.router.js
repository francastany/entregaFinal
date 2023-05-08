import { Router } from "express";
import sessionsController from "../controllers/sessions.controller.js";
import uploader from "../services/uploader.js";
import passport from "passport";

const router = Router();

router.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/api/sessions/loginFail",
        session: false,
    }),
    sessionsController.login
);
router.post(
    "/register",
    uploader.single("avatar"),
    sessionsController.register
);
router.get("/loginFail", sessionsController.loginFail);

export default router;
