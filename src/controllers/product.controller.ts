import Container from "typedi";
import { RouteHandler } from "../interfaces/route.interface.js";
import { ProductService } from "../services/product.service";

export const addProduct: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(ProductService);
		const { name, description } = req.data;
		const { user_id, company_id } = req.user;
		const payload = await service.createProduct(user_id, company_id, name, description);
		res.status(201).json(payload);
	} catch (error) {
		next(error);
	}
};
export const accessProduct: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(ProductService);
		const { user_id, company_id } = req.user;
		const product_id = Number(req.params.id);
		const payload = await service.accessProduct(user_id, company_id, product_id);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const getProduct: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(ProductService);
		const { company_id, product_id } = req.user;
		const payload = await service.getProduct(company_id, product_id);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const getProducts: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(ProductService);
		const { company_id } = req.user;
		const payload = await service.getProducts(company_id);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
// export const updateProduct: RouteHandler = async (req, res, next) => {
// 	try {
// 		const id = Number(req.params.id);
// 		const { name, description, stock, price } = req.body;
// 		const product = await Product.find(id);
// 		if (!product) throw ErrorFactory.createError("NotFoundError", "Product not found");
// 		await Product.update({ id, name, description, stock, price });
// 		res.status(200).json({
// 			message: "Product updated successfully",
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };
// export const deleteProduct: RouteHandler = async (req, res, next) => {
// 	try {
// 		const id = Number(req.params.id);
// 		const product = await Product.find(id);
// 		if (!product) throw ErrorFactory.createError("NotFoundError", "Product not found");
// 		await Product.delete(product);
// 		res.status(204).json({
// 			message: "Product deleted successfully",
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };
