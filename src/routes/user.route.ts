import { Router } from "express";
import { login, signup } from "../controllers/user.controller";
import { validateFields } from "../middlewares/validateFields.middleware";

const userRoutes = Router();

userRoutes.post("/login", validateFields("username", "password"), login);
userRoutes.post("/signup", validateFields("username", "email", "password"), signup);

export default userRoutes;
