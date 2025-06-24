import { QueryTypes } from "sequelize";
import database from "../db/connection";
import { CRUD } from "../interfaces/crud.interface";

export class ProductRepository implements CRUD {
	create(data: any): Promise<any> {
		return database.query('CALL add_product(:user_id, :company_id, :name, :description)', {
			replacements: {
				name: data.name,
				description: data.description,
				user_id: data.user_id,
				company_id: data.company_id
			},
			type: QueryTypes.SELECT
		});
	}
	find(data: any): Promise<any> {
		return database.query('CALL get_product(:company_id, :product_id)', {
			replacements: {
				company_id: data.company_id,
				product_id: data.product_id
			},
			type: QueryTypes.SELECT
		});
	}
	update(data: any): Promise<any> {
		return database.query('CALL update_product(:product_id, :name, :description)', {
			replacements: {
				product_id: data.product_id,
				name: data.name,
				description: data.description
			},
			type: QueryTypes.SELECT
		});
	}
	delete(data: any): Promise<any> {
		return database.query('CALL delete_product(:product_id)', {
			replacements: {
				product_id: data.product_id
			},
			type: QueryTypes.SELECT
		});
	}
	findAllByCompanyId(companyId: number): Promise<any[]> {
		return database.query('CALL get_products(:companyId)', {
			replacements: {
				companyId
			},
			type: QueryTypes.SELECT
		});
	}
}
