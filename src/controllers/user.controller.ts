import { Container } from "typedi";
import { RouteHandler } from "../interfaces/route.interface";
import { UserService } from "../services/user.service";
import { redisComponent } from "../components/redis.component";

export const signup: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(UserService);
		const { username, email, password } = req.data;
		const payload = await service.signup(username, email, password);
		res.status(201).json(payload);
	} catch (error) {
		next(error);
	}
};

export const login: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(UserService);
		const { username, password } = req.data;
		const payload = await service.loginUser(username, password);
		if(!payload.auth)
			res.status(202).json(payload);
		else
			res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};

export const auth: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(UserService);
		const { user_id } = req.user;
		const payload = await service.auth(user_id);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const logout: RouteHandler = async (req, res, next) => {
	try{
		const { token } = req;
		const { exp } = req.user;
		const ttl = exp - Math.floor(Date.now() / 1000);
		await redisComponent.component.set(`blacklist:${token}`, "true", {
			expiration: {
				type: "EX",
				value: ttl,
			},
		});
		const payload = {
			message: "Logged out successfully",
		};
		res.status(204).send(payload);
	}catch(error){
		next(error);
	}
}
