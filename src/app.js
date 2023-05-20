import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import cors from "cors";

import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import cartsRouter from "./routes/carts.router.js";
import stickersRouter from "./routes/stickers.router.js";
import keysRouter from "./routes/keys.router.js";

import config from "./config/config.js";
import initializeStrategies from "./config/passport.config.js";
import __dirname from "./utils.js";

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(config.mongo.URL);

//Views
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

//Middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Passport strategies
initializeStrategies();

//Routes
app.use("/", viewsRouter);
app.use("/api/sessions/", sessionsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/api/stickers/", stickersRouter);
app.use("/api/keys/", keysRouter);

app.listen(PORT, () => console.log(`Listening on... http://localhost:${PORT}`));
