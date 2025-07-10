import { appEnv } from "../config/env.config";
import { tokenAccessLife } from "../config/token.config";
import { TokenPayload } from "../interfaces/token.interface";
import jwt from "jsonwebtoken";
import { Admin, Auth, Guest, User } from "./role.class";

export abstract class TokenFactory {
	abstract createPayload(extra?: any): TokenPayload;
	createToken(extra?: any) {
		const payload = this.createPayload(extra);
		return jwt.sign(payload, appEnv.JWT_SECRET, {
			expiresIn: tokenAccessLife,
		});
	}
}

export class UserToken extends TokenFactory {
	createPayload(extra?: any): TokenPayload {
		return {
			...extra,
			role: new User(),
		};
	}
}
export class AdminToken extends TokenFactory {
	createPayload(extra?: any): TokenPayload {
		return {
			...extra,
			role: new Admin(),
		};
	}
}
export class GuestToken extends TokenFactory {
	createPayload(extra?: any): TokenPayload {
		return {
			...extra,
			role: new Guest(),
		};
	}
}
export class AuthToken extends TokenFactory {
	createPayload(extra?: any): TokenPayload {
		return {
			...extra,
			role: new Auth(),
		}
	}
}