import { Product } from "./product.model";
import { User } from "./user.model";

User.hasMany(Product, {foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "NO ACTION"});
Product.belongsTo(User, {foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "NO ACTION"});

export { User, Product };