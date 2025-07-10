export class ErrorFactory {
	static createError(type: string, message: string) {
		switch (type) {
			case "PermissionDeniedError":
				return new PermissionDeniedError(message);
			case "NotFoundError":
				return new NotFoundError(message);
			case "ViolationSystemError":
				return new ViolationSystemError(message);
			case "SpError":
				return new SpError(message);
			default:
				return new Error(`Unknown error type: ${type}`);
		}
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
export class SpError extends Error {
	constructor(message: any) {
		super(message);
		this.name = "SpError";
	}
}
