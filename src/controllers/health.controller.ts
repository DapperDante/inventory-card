import database from "../db/connection";
import { RouteHandler } from "../interfaces/route.interface";

export const healthCheck: RouteHandler = async (req, res, next) => {
	let dbStatus = "ok";
	try {
		await database.query("SELECT 1");
	} catch (error) {
		dbStatus = "error";
	}
	res.status(200).json({
		api: "ok",
		database: dbStatus,
		timestamp: new Date().toISOString(),
	});
};
