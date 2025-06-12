import dotenv from "dotenv";
dotenv.config();

const appEnv = {
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	CORS_ORIGINS: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
	JWT_SECRET: process.env.JWT_SECRET!,
	BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS)
};

const dbEnv = {
	DB_HOST: process.env.DB_HOST,
	DB_PORT: Number(process.env.DB_PORT)!,
	DB_USER: process.env.DB_USER!,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_NAME: process.env.DB_NAME!,
	DB_DIALECT: process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
};
export { appEnv, dbEnv };