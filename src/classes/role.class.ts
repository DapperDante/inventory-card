import { Role } from "../interfaces/role.interface";

export class RoleFactory {
	static createRole(roleType: string): Role {
		switch (roleType.toLowerCase()) {
			case "admin":
				return new Admin();
			case "user":
				return new User();
			case "guest":
				return new Guest();
			case "auth":
				return new Auth();
			default:
				throw new Error(`Role type ${roleType} is not recognized.`);
		}
	}
}

export class Admin extends Role {
	constructor() {
		super(["read", "write", "delete", "update"], "admin");
	}
}

export class User extends Role {
	constructor() {
		super(["read", "write", "delete", "update"], "user");
	}
}

export class Guest extends Role {
	constructor() {
		super(["read"], "guest");
	}
}
export class Auth extends Role {
	constructor() {
		super(["update"], "auth");
	}
}
