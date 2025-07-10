import { UniqueConstraintError, ValidationError } from "sequelize";
import { PermissionDeniedError, NotFoundError, SpError } from "../classes/error.class";
import { RouteError } from "../interfaces/route.interface";
import { TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";

const handleTokenExpiredError: RouteError = (err, req, res, next) => {
	console.log(err);
	if (err instanceof TokenExpiredError)
		return res.status(401).json({
			message: "Unauthorized: session expired",
		});
	next(err);
};

const handlePermissionDeniedError: RouteError = (err, req, res, next) => {
	if (err instanceof PermissionDeniedError) {
		return res.status(403).json({
			message: err.message || "Bad request: Permission denied",
		});
	}
	next(err);
};

const handleSyntaxError: RouteError = (err, req, res, next) => {
	if (err instanceof SyntaxError) {
		return res.status(400).json({
			message: "Bad Request: Invalid JSON",
		});
	}
	next(err);
};

const handleInvalidationFieldsError: RouteError = (err, req, res, next) => {
	if (err instanceof ZodError) {
		return res.status(400).json({
			message: "Bad Request: Invalid JSON",
		});
	}
	next(err);
};

const handleUniqueConstraintError: RouteError = (err, req, res, next) => {
	if (err instanceof UniqueConstraintError) {
		return res.status(409).json({
			message: err.message || "Bad Request: Unique constraint violation",
		});
	}
	next(err);
};
const handleValidationError: RouteError = (err, req, res, next) => {
	if (err instanceof ValidationError) {
		return res.status(400).json({
			message: err.message || "Bad Request: Validation error",
		});
	}
	next(err);
};
const handleNotFoundError: RouteError = (err, req, res, next) => {
	if(err instanceof NotFoundError){
		return res.status(404).json({
			message: err.message || "Not Found",
		});
	}
	next(err);
};
const handleSpError: RouteError = (err, req, res, next) => {
	if (err instanceof SpError) {
		return res.status(500).json({
			message: err.message || "Internal Server Error",
		});
	}
	next(err);
};
const handleGenericError: RouteError = (err, req, res, next) => {
	res.status(500).json({
		message: "Internal Server Error",
	});
};

export const errorHandler = [
	handleTokenExpiredError,
	handlePermissionDeniedError,
	handleSyntaxError,
	handleInvalidationFieldsError,
	handleUniqueConstraintError,
	handleValidationError,
	handleNotFoundError,
	handleSpError,
	handleGenericError,
];
