import { createClient, RedisClientType } from "redis";
import { Component } from "../interfaces/component.interface";
import { appEnv, redisEnv } from "../config/env.config";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { loggerSystem } from "../config/logger.config";

class RedisComponent implements Component {
	private _component: RedisClientType;
	private _rateLimiter: RateLimiterRedis | null;
	constructor() {
		this._component = createClient({
			url: redisEnv.REDIS_URL,
			socket: {
				connectTimeout: 2000,
			},
		});
		this._rateLimiter = null;
	}
	async connect() {
		await this._component
			.connect()
			.then(() => {
				console.log("Redis connected successfully");
				this._rateLimiter = new RateLimiterRedis({
					storeClient: this._component,
					keyPrefix: "middleware",
					points: appEnv.API_RATE_LIMIT,
					duration: 15 * 60,
					useRedisPackage: true,
				});
			})
			.catch(error => {
				loggerSystem.error(`Redis connection failed: ${error.message}`);
			});
	}
	async healthCheck() {
		return this._component.isReady;
	}

	get component() {
		return this._component;
	}
	get rateLimiter() {
		return this._rateLimiter ?? { consume: ip => Promise.resolve() };
	}
}

const redisComponent = new RedisComponent();
export { redisComponent };
