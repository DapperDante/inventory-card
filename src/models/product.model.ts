import { DataTypes } from "sequelize";
import { dbComponent } from "../components/database.component";

export const Product = dbComponent.component.define(
	"Product",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		inactive: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
);
