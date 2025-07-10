import Container from "typedi";
import { RouteHandler } from "../interfaces/route.interface";
import { CardService } from "../services/card.service";

export const addCard: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(CardService);
		const { method_id, currency_id, name, description, date } = req.data;
		const { user_id, company_id, product_id } = req.user;
		const payload = await service.createCard(
			user_id,
			company_id,
			product_id,
			method_id,
			currency_id,
			name,
			description,
			date
		);
		res.status(201).json(payload);
	} catch (error) {
		next(error);
	}
};

export const accessCard: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(CardService);
		const card_id = Number(req.params.id);
		const { user_id, company_id, product_id } = req.user;
		const payload = await service.accessCard(
			user_id,
			company_id,
			product_id,
			card_id
		);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const getCard: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(CardService);
		const { user_id, card_id } = req.user;
		const payload = await service.getCard(user_id, card_id);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const getCards: RouteHandler = async (req, res, next) => {
	try {
		const service = Container.get(CardService);
		const { product_id } = req.user;
		const payload = await service.getCards(product_id);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
