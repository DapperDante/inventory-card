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
			default:
				throw new Error(`Role type ${roleType} is not recognized.`);
		}
	}
}

export class Admin implements Role {
	private permissions: string[];
	private name: string;
	constructor() {
		this.permissions = ["read", "write", "delete", "update"];
		this.name = "Admin";
	}
	getPermissions(): string[] {
		return this.permissions;
	}
	isSameRole(role: string): boolean {
		return role === this.name;
	}
}

export class User implements Role {
	private permissions: string[];
	private name: string;
	constructor() {
		this.permissions = ["read", "write", "delete", "update"];
		this.name = "User";
	}
	getPermissions(): string[] {
		return this.permissions;
	}
	isSameRole(role: string): boolean {
		return role === this.name;
	}
}

export class Guest implements Role {
	private permissions: string[];
	private name: string;
	constructor() {
		this.permissions = ["read"];
		this.name = "Guest";
	}
	getPermissions(): string[] {
		return this.permissions;
	}
	isSameRole(role: string): boolean {
		return role === this.name;
	}
}
