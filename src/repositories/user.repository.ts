import { QueryTypes } from "sequelize";
import database from "../db/connection";
import { CRUD } from "../interfaces/crud.interface";
import { Service } from "typedi";

// Each method returns JSON, therefore QueryTypes.SELECT is used.
@Service()
export class UserRepository implements CRUD {
	async create(data: any): Promise<any> {
		return database.query('CALL add_user(:username, :email, :password)', {
			replacements: {
				username: data.username,
				email: data.email,
				password: data.password
			},
			type: QueryTypes.SELECT
		});
	}
	async find(data: any): Promise<any> {
		return database.query('CALL get_user(:id)', {
			replacements: { id: data.id },
			type: QueryTypes.SELECT
		});
	}
	async update(data: any): Promise<any> {
		return database.query('CALL update_user(:id, :username, :email, :password)', {
			replacements: {
				id: data.id,
				username: data.username,
				email: data.email,
				password: data.password
			},
			type: QueryTypes.SELECT
		});
	}
	async delete(data: any): Promise<any> {
		return database.query('CALL delete_user(:id)', {
			replacements: { id: data.id },
			type: QueryTypes.SELECT
		});
	}
	async findByEmail(email: string): Promise<any> {
		return database.query('CALL get_user_by_email(:email)', {
			replacements: { email },
			type: QueryTypes.SELECT
		});
	}
	async findByUsername(username: string): Promise<any> {
		return database.query('CALL get_user_by_username(:username)', {
			replacements: { username },
			type: QueryTypes.SELECT
		});
	}
	async authUser(id: number):Promise<any>{
		return database.query('CALL authenticate_user(:id)',	 {
			replacements: {id},
			type: QueryTypes.SELECT
		})
	}
}
