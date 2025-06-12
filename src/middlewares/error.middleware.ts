import { UniqueConstraintError, ValidationError } from "sequelize";
import { PermissionDeniedError, InvalidationFieldsError, NotFoundError } from "../classes/error.class";
import { RouteError } from "../interfaces/route.interface";

const handlePermissionDeniedError: RouteError = (err, req, res, next) => {
	console.log(err);
	if (err instanceof PermissionDeniedError) {
		return res.status(403).json({
			message: err.message || "Bad request: Permission denied",
		});
	}
	next(err);
};

const handleInvalidationFieldsError: RouteError = (err, req, res, next) => {
	if (err instanceof InvalidationFieldsError) {
		return res.status(400).json({
			message: err.message || "Bad Request: Invalid JSON",
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
const handleGenericError: RouteError = (err, req, res, next) => {
	res.status(500).json({
		message: "Internal Server Error",
	});
};

export const errorHandler = [
	handlePermissionDeniedError,
	handleInvalidationFieldsError,
	handleUniqueConstraintError,
	handleValidationError,
	handleNotFoundError,
	handleGenericError,
];
