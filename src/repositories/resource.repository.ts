import { QueryTypes } from "sequelize";
import database from "../db/connection";
import { Service } from "typedi";
@Service()
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
  getConcepts(): Promise<any>{
    return database.query("SELECT * FROM movement_concepts;", {
      type: QueryTypes.SELECT
    });
  }
}