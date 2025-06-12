import { ErrorFactory } from "../classes/error.class";
import { RouteHandler } from "../interfaces/route.interface";
import { UserRepository } from "../repositories/user.repository";
import { hashPassword, verifyPassword } from "../security/encryptation.security";
import { createTokenFactory } from "../security/token.security";

const User = new UserRepository();

export const signup: RouteHandler = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const hashedPassword = await hashPassword(password);
		const newUser = await User.create({ username, email, password: hashedPassword });
		const token = createTokenFactory("admin", { user_id: newUser.dataValues.id });
		const payload = {
			token,
		};
		res.status(201).json(payload);
	} catch (error) {
		next(error);
	}
};
export const login: RouteHandler = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findByUsername(username);
		if (!user) 
			throw ErrorFactory.createError("NotFoundError", "User not found");
		const isValid = await verifyPassword(password, user.dataValues.password);
		if (!isValid) 
			throw ErrorFactory.createError("PermissionDeniedError", "Invalid password");
		const token = createTokenFactory("admin", {user_id: user.dataValues.id});
		const payload = {
			token,
		};
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
