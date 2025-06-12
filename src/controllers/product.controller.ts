import { ProductRepository } from "../repositories/product.repository";
import { ErrorFactory } from "../classes/error.class";
import { RouteHandler } from "../interfaces/route.interface.js";

const Product = new ProductRepository();

export const addProduct: RouteHandler = async (req, res, next) => {
	try {
		const { name, description, stock, price } = req.body;
		const { user_id } = req.user;
		const product = await Product.create({ name, description, stock, price, user_id });
		res.status(201).json({
			id: product.dataValues.id,
			message: "Product created successfully",
		});
	} catch (error) {
		next(error);
	}
};
export const getProducts: RouteHandler = async (req, res, next) => {
	try {
		const { user_id } = req.user;
		const products = await Product.findAllByUserId(user_id);
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};
export const updateProduct: RouteHandler = async (req, res, next) => {
	try {
		const id = Number(req.params.id);
		const { name, description, stock, price } = req.body;
		const product = await Product.find(id);
		if (!product) throw ErrorFactory.createError("NotFoundError", "Product not found");
		await Product.update(product, { name, description, stock, price });
		res.status(200).json({
			message: "Product updated successfully",
		});
	} catch (error) {
		next(error);
	}
};
export const deleteProduct: RouteHandler = async (req, res, next) => {
	try {
		const id = Number(req.params.id);
		const product = await Product.find(id);
		if (!product) throw ErrorFactory.createError("NotFoundError", "Product not found");
		await Product.delete(product);
		res.status(204).json({
			message: "Product deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};
