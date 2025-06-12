import app from "./app";
import { appEnv } from "./config/env.config";
import database from "./db/connection";

database
	.authenticate()
	.then(() => {
		console.log("Database connected successfully");
	})
	.catch(error => {
		console.error("Database connection failed:", error);
	});

const server = app.listen(appEnv.PORT);

server.on("listening", () => {
	console.log(`Server is running on port ${appEnv.PORT}`);
});

server.on("error", error => {
	console.error("Error starting server:", error);
});
