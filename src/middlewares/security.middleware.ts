import cors from "cors";
import express from "express";
import { appEnv } from "../config/env.config";
import { RouteHandler } from "../interfaces/route.interface";
import { ErrorFactory } from "../classes/error.class";
import { redisComponent } from "../components/redis.component";

const corsMiddleware = cors({
	origin: function (origin, callback) {
		if (!appEnv.PRODUCTION || !origin || appEnv.CORS_ORIGINS.indexOf(origin!) !== -1) {
			callback(null, true);
		} else {
			callback(ErrorFactory.createError("SecurityError", "Origin not allowed by CORS", 403));
		}
	},
	optionsSuccessStatus: 200,
	methods: "GET,PUT,POST,DELETE",
	allowedHeaders: ["Content-Type", "Authorization"],
});

const rateLimiterMiddleware: RouteHandler = async (req, res, next) => {
	redisComponent.rateLimiter
		.consume(req.ip!)
		.then(() => {
			next();
		})
		.catch(() => {
			next(
				ErrorFactory.createError("SecurityError", "Too many requests, please try again later", 429)
			);
		});
};

const timeoutsMiddleware: RouteHandler = (req, res, next) => {
	req.setTimeout(appEnv.API_TIMEOUT_REQUEST, () => {
		next(
			ErrorFactory.createError(
				"SecurityError",
				"Request timeout: The request took longer time to process",
				408
			)
		);
	});
	res.setTimeout(appEnv.API_TIMEOUT_RESPONSE, () => {
		next(
			ErrorFactory.createError(
				"SecurityError",
				"Response timeout: The response took longer time to send",
				408
			)
		);
	});
	next();
};

const limitPayloadSizeMiddleware = express.json({
	limit: appEnv.API_PAYLOAD_LIMIT,
});
export { corsMiddleware, rateLimiterMiddleware, timeoutsMiddleware, limitPayloadSizeMiddleware };
