import { Service } from "typedi";
import database from "../db/connection";
import { QueryTypes } from "sequelize";

@Service()
export class MovementRepository{
  initialBalance(data: any): Promise<any>{
    return database.query('CALL add_initial_balance(:user_id, :card_id, :quantity, :unit_cost)', {
      replacements: {
        user_id: data.user_id,
        card_id: data.card_id,
        quantity: data.quantity,
        unit_cost: data.unit_cost
      },
      type: QueryTypes.SELECT
    });
  }
  purchase(data: any): Promise<any>{
    return database.query('CALL purchase_product(:user_id, :card_id, :quantity, :unit_cost)', {
      replacements: {
        user_id: data.user_id,
        card_id: data.card_id,
        quantity: data.quantity,
        unit_cost: data.unit_cost
      },
      type: QueryTypes.SELECT
    });
  }
  sale(data: any): Promise<any>{
    return database.query('CALL sale_product(:user_id, :card_id, :quantity)', {
      replacements: {
        user_id: data.user_id,
        card_id: data.card_id,
        quantity: data.quantity
      },
      type: QueryTypes.SELECT
    });
  }
  purchaseReturn(data: any): Promise<any>{
    return database.query('CALL purchase_return(:user_id, :card_id, :quantity)', {
      replacements: {
        user_id: data.user_id,
        card_id: data.card_id,
        quantity: data.quantity
      },
      type: QueryTypes.SELECT
    });
  }
  saleReturn(data: any): Promise<any>{
    return database.query('CALL sale_return(:user_id, :card_id, :quantity)', {
      replacements: {
        user_id: data.user_id,
        card_id: data.card_id,
        quantity: data.quantity
      },
      type: QueryTypes.SELECT
    });
  }
  productionRequired(data: any): Promise<any>{
    return database.query('CALL production_required(:user_id, :card_id, :quantity)', {
      replacements: {
        user_id: data.user_id,
        card_id: data.card_id,
        quantity: data.quantity
      },
      type: QueryTypes.SELECT
    });
  }
  productionReturn(data: any): Promise<any>{
    return database.query('CALL production_return(:user_id, :card_id, :quantity)', {
      replacements: {
        user_id: data.user_id,
        card_id: data.card_id,
        quantity: data.quantity
      },
      type: QueryTypes.SELECT
    });
  }
  getMovements(data: any): Promise<any>{
    return database.query('CALL get_movements(:card_id)', {
      replacements: {
        card_id: data.card_id
      },
      type: QueryTypes.SELECT
    });
  }
}