export class ErrorFactory {
	static createError(type: any, message: string) {
		switch (type) {
			case "InvalidationFieldsError":
				return new InvalidationFieldsError(message);
			case "PermissionDeniedError":
				return new PermissionDeniedError(message);
			case "NotFoundError":
				return new NotFoundError(message);
			case "ViolationSystemError":
				return new ViolationSystemError(message);
			default:
				return new Error(`Unknown error type: ${type}`);
		}
	}
}

export class InvalidationFieldsError extends Error {
	constructor(message: any) {
		super(message);
		this.name = "ValidationError";
	}
}
export class PermissionDeniedError extends Error {
	constructor(message: any) {
		super(message);
		this.name = "PermissionDeniedError";
	}
}
export class NotFoundError extends Error {
	constructor(message: any) {
		super(message);
		this.name = "NotFoundError";
	}
}
export class ViolationSystemError extends Error {
	constructor(message: any) {
		super(message);
		this.name = "ViolationSystemError";
	}
}
