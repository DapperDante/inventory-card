import { DataTypes } from "sequelize";
import database from "../db/connection";

export const User = database.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING(254),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		inactive: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{ createdAt: false, updatedAt: false }
);
