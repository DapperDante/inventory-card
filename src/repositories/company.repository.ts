import { QueryTypes } from "sequelize";
import database from "../db/connection";
import { CRUD } from "../interfaces/crud.interface";

export class CompanyRepository implements CRUD {
	create(data: any): Promise<any> {
		return database.query("CALL add_company(:user_id, :name)", {
			replacements: {
				user_id: data.user_id,
				name: data.name,
			},
			type: QueryTypes.SELECT,
		});
	}
	find(data: any): Promise<any> {
		return database.query("CALL get_company(:user_id, :company_id)", {
			replacements: { company_id: data.company_id, user_id: data.user_id },
			type: QueryTypes.SELECT,
		});
	}
	update(data: any): Promise<any> {
		return database.query("CALL update_company(:id, :name, :email, :address)", {
			replacements: {
				id: data.id,
				name: data.name,
				email: data.email,
				address: data.address,
			},
			type: QueryTypes.SELECT,
		});
	}
	delete(data: any): Promise<any> {
		return database.query("CALL delete_company(:id)", {
			replacements: { id: data.id },
			type: QueryTypes.SELECT,
		});
	}
	findAllByUserId(userId: number): Promise<any> {
		return database.query("CALL get_companies(:userId)", {
			replacements: { userId },
			type: QueryTypes.SELECT,
		});
	}
}
