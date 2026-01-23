import dotenv from "dotenv";
dotenv.config();

const appEnv = {
	PORT: process.env.PORT || 3000,
	NODE_ENV: process.env.NODE_ENV || 'testing',
	PRODUCTION: process.env.NODE_ENV === "production" || false,
	CORS_ORIGINS: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
	JWT_SECRET: process.env.JWT_SECRET || 'secret_key',
	BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),
	API_RATE_LIMIT: process.env.API_RATE_LIMIT ? Number(process.env.API_RATE_LIMIT) : 100,
	API_PAYLOAD_LIMIT: process.env.API_PAYLOAD_LIMIT ? process.env.API_PAYLOAD_LIMIT : '1mb',
	API_TIMEOUT_RESPONSE: process.env.API_TIMEOUT_RESPONSE ? Number(process.env.API_TIMEOUT_RESPONSE) : 5000,
	API_TIMEOUT_REQUEST: process.env.API_TIMEOUT_REQUEST ? Number(process.env.API_TIMEOUT_REQUEST) : 5000,
	API_KEEP_ALIVE_TIMEOUT: process.env.API_KEEP_ALIVE_TIMEOUT ? Number(process.env.API_KEEP_ALIVE_TIMEOUT) : 30000,
	API_HEADERS_TIMEOUT: process.env.API_HEADERS_TIMEOUT ? Number(process.env.API_HEADERS_TIMEOUT) : 30000
};

const dbEnv = {
	DB_HOST: process.env.DB_HOST || '127.0.0.1',
	DB_PORT: Number(process.env.DB_PORT)! || 3306,
	DB_USER: process.env.DB_USER! || 'root',
	DB_PASSWORD: process.env.DB_PASSWORD || 'passwordRoot',
	DB_NAME: process.env.DB_NAME! || 'testing',
	DB_DIALECT: process.env.DB_DIALECT || 'mysql',
	DB_LOGGING: !!(Number(process.env.DB_LOGGING) || 0),
};

const redisEnv = {
	REDIS_URL: process.env.REDIS_URL!,
}

export { appEnv, dbEnv, redisEnv };
