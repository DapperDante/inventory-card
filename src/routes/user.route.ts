import { Router } from "express";
import { auth, login, logout, signup } from "../controllers/user.controller";
import { validateFields } from "../middlewares/validateFields.middleware";
import { UserFields } from "../classes/fields.class";
import { applyRole } from "../middlewares/role.middleware";
import { authenticateToken } from "../middlewares/token.middleware";

const userRoutes = Router();

userRoutes.post("/login", validateFields(UserFields.login), login);
userRoutes.post("/signup", validateFields(UserFields.signup), signup);
userRoutes.post("/auth", applyRole("auth"), auth);
userRoutes.post("/logout", authenticateToken, logout);

export default userRoutes;
