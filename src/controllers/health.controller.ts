import { RouteHandler } from "../interfaces/route.interface";
import { dbComponent } from "../components/database.component";
import { redisComponent } from "../components/redis.component";
import { serverComponent } from "../components/server.component";

export const healthCheck: RouteHandler = async (req, res, next) => {
	res.status(200).json({
		api: await serverComponent.healthCheck(),
		database: await dbComponent.healthCheck(),
		redis: await redisComponent.healthCheck(),
		timestamp: new Date().toISOString(),
	});
};
