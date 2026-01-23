import { Dialect, Sequelize } from "sequelize";
import { dbEnv } from "../config/env.config";
import { Component } from "../interfaces/component.interface";
import { loggerSystem } from "../config/logger.config";

class DatabaseComponent implements Component {
	private _component: Sequelize;
	constructor() {
		this._component = new Sequelize(
			dbEnv.DB_NAME, 
			dbEnv.DB_USER, 
			dbEnv.DB_PASSWORD, {
			host: dbEnv.DB_HOST,
			port: dbEnv.DB_PORT,
			dialect: dbEnv.DB_DIALECT as Dialect,
			logging: dbEnv.DB_LOGGING,
		});
	}
	async connect() {
		await this._component
			.authenticate()
			.then(() => {
				console.log(`Database connected successfully to: ${this._component.getDatabaseName()}`);
			})
			.catch(error => {
				loggerSystem.error(`Database connection failed: ${error.message}`);
			});
	}
	async healthCheck(): Promise<boolean> {
		return this._component
			.query("SELECT 1")
			.then(() => true)
			.catch(() => false);
	}
	get component(): Sequelize {
		return this._component;
	}
}
// Crucial para evitar dependencia circular
const dbComponent = new DatabaseComponent();
export { dbComponent };
