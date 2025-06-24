import { ProductRepository } from "../repositories/product.repository";
import { ErrorFactory } from "../classes/error.class";
import { RouteHandler } from "../interfaces/route.interface.js";
import { createTokenFactory } from "../security/token.security";

const Product = new ProductRepository();

export const addProduct: RouteHandler = async (req, res, next) => {
	try {
		const { name, description } = req.body;
		const { user_id, company_id } = req.user;
		const [query] = await Product.create({ name, description, user_id, company_id });
		const { response } = query[0];
		if (response.error_code) throw ErrorFactory.createError("SpError", response.message);
		const payload = {
			message: "Product created successfully",
		};
		res.status(201).json(payload);
	} catch (error) {
		next(error);
	}
};
export const accessProduct: RouteHandler = async (req, res, next) => {
	try {
		const { user_id, company_id } = req.user;
		const product_id = Number(req.params.id);
		const [query] = await Product.find({ product_id, company_id });
		const { response } = query[0];
		if (response.error_code) 
			throw ErrorFactory.createError("SpError", response.message);
		const payloadToken = {
			user_id,
			company_id,
			product_id
		};
		const token = createTokenFactory("admin", payloadToken);
		const payload = {
			token,
		};
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const getProduct: RouteHandler = async (req, res, next) => {
	try {
		const { company_id, product_id } = req.user;
		const [query] = await Product.find({ product_id, company_id });
		const { response } = query[0];
		if (response.error_code) 
			throw ErrorFactory.createError("SpError", response.message);
		res.status(200).json(response.result);
	} catch (error) {
		next(error);
	}
};
export const getProducts: RouteHandler = async (req, res, next) => {
	try {
		const { company_id } = req.user;
		const [query] = await Product.findAllByCompanyId(company_id);
		const { response } = query[0];
		if (response.error_code) throw ErrorFactory.createError("SpError", response.message);
		res.status(200).json(response.result);
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
		await Product.update({ id, name, description, stock, price });
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
