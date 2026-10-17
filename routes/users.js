import express from "express";
import {controller as loginController, controller} from "../controllers/Users.js";
import validation from "../middlewares/validation.js";
import schema from "../middlewares/schemas/users.schema.js";
import auth from "../middlewares/authorization.js";

const router = express.Router();

router.get("/home", auth, async (req, res, next) => {
    res.render('home');
});

router.post(
    "/register",
    validation(schema.register, "body"),
    controller.register
);

router.post(
    "/login",
    validation(schema.login, "body"),
    controller.login
);

router.get("/logout", controller.logout);

export default router;