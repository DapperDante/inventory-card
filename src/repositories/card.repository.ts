import { QueryTypes } from 'sequelize';
import database from '../db/connection';
import { CRUD } from '../interfaces/crud.interface';
import { Service } from 'typedi';
@Service()
export class CardRepository implements CRUD {
	create(data: any): Promise<any[]> {
		return database.query(
			'CALL add_inventory_card(:user_id, :product_id, :method_id, :currency_id, :name, :description, :date)',
			{
				replacements: {
					user_id: data.user_id,
					product_id: data.product_id,
					method_id: data.method_id,
					currency_id: data.currency_id,
					name: data.name,
					description: data.description,
					date: data.date,
				},
				type: QueryTypes.SELECT
			}
		);
	}
	find(data: any): Promise<any> {
		return database.query('CALL get_inventory_card(:user_id, :card_id)', {
			replacements: { card_id: data.card_id, user_id: data.user_id },
			type: QueryTypes.SELECT
		});
	}
	update(data: any): Promise<any> {
		return database.query('CALL update_inventory_card(:id, :name, :companyId, :details)', {
			replacements: {
				id: data.id,
				name: data.name,
				companyId: data.companyId,
				details: data.details,
			},
			type: QueryTypes.SELECT
		});
	}
	delete(card: any): Promise<any> {
		return database.query('CALL delete_inventory_card(:id)', {
			replacements: { id: card.id },
			type: QueryTypes.SELECT
		});
	}
	findAllByProductId(productId: number): Promise<any>{
		return database.query('CALL get_inventory_cards(:product_id)', {
			replacements: {
				product_id: productId
			},
			type: QueryTypes.SELECT
		});
	}
}
