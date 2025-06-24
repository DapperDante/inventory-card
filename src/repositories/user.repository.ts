import { QueryTypes } from "sequelize";
import database from "../db/connection";
import { CRUD } from "../interfaces/crud.interface";
// Each method returns JSON, therefore QueryTypes.SELECT is used.
export class UserRepository implements CRUD {
	create(data: any): Promise<any> {
		return database.query('CALL add_user(:username, :email, :password)', {
			replacements: {
				username: data.username,
				email: data.email,
				password: data.password
			},
			type: QueryTypes.SELECT
		});
	}
	find(id: number): Promise<any> {
		return database.query('CALL get_user(:id)', {
			replacements: { id },
			type: QueryTypes.SELECT
		});
	}
	update(user: any, data: any): Promise<any> {
		return database.query('CALL update_user(:id, :username, :email, :password)', {
			replacements: {
				id: user.id,
				username: data.username,
				email: data.email,
				password: data.password
			},
			type: QueryTypes.SELECT
		});
	}
	delete(user: any): Promise<any> {
		return database.query('CALL delete_user(:id)', {
			replacements: { id: user.id },
			type: QueryTypes.SELECT
		});
	}
	findByEmail(email: string): Promise<any> {
		return database.query('CALL get_user_by_email(:email)', {
			replacements: { email },
			type: QueryTypes.SELECT
		});
	}
	findByUsername(username: string): Promise<any> {
		return database.query('CALL get_user_by_username(:username)', {
			replacements: { username },
			type: QueryTypes.SELECT
		});
	}
}
