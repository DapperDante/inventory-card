import 'reflect-metadata';
import { appEnv } from "../config/env.config";
import { Component } from "../interfaces/component.interface";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import responseTime from "response-time";
import mainRoutes from "../routes/main.route";
import userRoutes from "../routes/user.route";
import productRoutes from "../routes/product.route";
import healthRoutes from "../routes/health.route";
import errorHandler from "../middlewares/error.middleware";
import {
	corsMiddleware,
	timeoutsMiddleware,
	rateLimiterMiddleware,
	limitPayloadSizeMiddleware,
} from "../middlewares/security.middleware";
import { loggerSystem } from "../config/logger.config";
import companyRoutes from "../routes/company.route";
import cardRoutes from "../routes/card.route";
import movementRoutes from "../routes/movement.route";
import resourceRoutes from "../routes/resource.route";

export class ServerComponent implements Component {
	private _component: express.Application;
	constructor() {
		this._component = express();

		// Middleware
		this._component.use(responseTime());
		this._component.use(helmet());
		this._component.use(corsMiddleware);
		this._component.use(rateLimiterMiddleware);
		this._component.use(timeoutsMiddleware);
		this._component.use(limitPayloadSizeMiddleware);
		this._component.use(compression());

		// Routes
		this._component.use("/", mainRoutes);
		this._component.use("/health", healthRoutes);
		this._component.use("/api/v1/user", userRoutes);
		this._component.use("/api/v1/company", companyRoutes);
		this._component.use("/api/v1/product", productRoutes);
		this._component.use("/api/v1/card", cardRoutes);
		this._component.use("/api/v1/movement", movementRoutes);
		this._component.use("/api/v1/resource", resourceRoutes);

		this._component.use(errorHandler);
	}
	connect(): void {
		const server = this._component.listen(appEnv.PORT);

		server.on("listening", () => {
			console.log(`Server is running on port ${appEnv.PORT}`);
		});

		server.on("error", error => {
			loggerSystem.error(`Server error: ${error.message}`);
		});

		server.keepAliveTimeout = appEnv.API_KEEP_ALIVE_TIMEOUT;
		server.headersTimeout = appEnv.API_HEADERS_TIMEOUT;
	}
	healthCheck(): Promise<boolean> {
		return Promise.resolve(true);
	}
	get component(): any {
		return this._component;
	}
}

const serverComponent = new ServerComponent();
export { serverComponent };