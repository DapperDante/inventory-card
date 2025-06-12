import { RoleFactory } from "../classes/role.class";
import { ErrorFactory } from "../classes/error.class";
import { RoleType } from "../interfaces/role.interface";
import { RouteHandler } from "../interfaces/route.interface";
import { decodeToken } from "../security/token.security";

export const applyRole = (...role: RoleType[]): RouteHandler => {
	return (req, res, next) => {
		try {
			const authHeader = req.headers["authorization"];
			const token = authHeader && authHeader.split(" ")[1];
			if (!token) {
				throw ErrorFactory.createError("PermissionDeniedError", "No token provided");
			}
			const decoded = decodeToken(token);
			const roles = role.map(r => RoleFactory.createRole(r));
			const isValidRole = roles.some(r => r.isSameRole(decoded.role.name));
			if (!isValidRole) {
				throw ErrorFactory.createError(
					"PermissionDeniedError",
					"You do not have permission to access this resource"
				);
			}
			req.user = decoded;
			next();
		} catch (error) {
			next(error);
		}
	};
};
