import Container from "typedi";
import { RouteHandler } from "../interfaces/route.interface";
import { MovementService } from "../services/movements.service";

export const initialBalance: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(MovementService);
		const { user_id, card_id } = req.user;
		const { quantity, unit_cost } = req.data;
		const payload = await service.initialBalance(user_id, card_id, quantity, unit_cost);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const purchase: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(MovementService);
		const { user_id, card_id } = req.user;
		const { quantity, unit_cost } = req.data;
		const payload = await service.purchase(user_id, card_id, quantity, unit_cost);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const sale: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(MovementService);
		const { user_id, card_id } = req.user;
		const { quantity } = req.data;
		const payload = await service.sale(user_id, card_id, quantity);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const purchaseReturn: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(MovementService);
		const { user_id, card_id } = req.user;
		const { quantity } = req.data;
		const payload = await service.purchaseReturn(user_id, card_id, quantity);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const saleReturn: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(MovementService);
		const { user_id, card_id } = req.user;
		const { quantity } = req.data;
		const payload = await service.saleReturn(user_id, card_id, quantity);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const productionRequired: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(MovementService);
		const { user_id, card_id } = req.user;
		const { quantity } = req.data;
		const payload = await service.productionRequired(user_id, card_id, quantity);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const productionReturn: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(MovementService);
		const { user_id, card_id } = req.user;
		const { quantity } = req.data;
		const payload = await service.productionReturn(user_id, card_id, quantity);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const getMovements: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(MovementService);
		const { user_id, card_id } = req.user;
		const payload = await service.getMovements(user_id, card_id);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
