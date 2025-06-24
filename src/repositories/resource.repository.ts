import { QueryTypes } from "sequelize";
import database from "../db/connection";

export class ResourceRepository {
  getMethods(): Promise<any>{
    return database.query("SELECT * FROM inventory_methods;", {
      type: QueryTypes.SELECT
    });
  }
  getCurrencies(): Promise<any>{
    return database.query("SELECT * FROM currencies;", {
      type: QueryTypes.SELECT
    })
  }
}