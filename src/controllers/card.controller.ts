import { ErrorFactory } from "../classes/error.class";
import { RouteHandler } from "../interfaces/route.interface";
import { CardRepository } from "../repositories/card.repository";
import { createTokenFactory } from "../security/token.security";

const card = new CardRepository();

export const addCard: RouteHandler = async (req, res, next) => {
	try {
		const { method_id, currency_id, name, description, date } = req.body;
		const { user_id, company_id, product_id } = req.user;
		const [query] = await card.create({
			user_id,
			method_id,
			product_id,
			currency_id,
			name,
			description,
			date,
		});
		const { response } = query[0];
		if (response.error_code) throw ErrorFactory.createError("SpError", response.message);
		const tokenPayload = {
			user_id,
			company_id,
			product_id,
			card_id: response.result.id,
		};
		const token = createTokenFactory("admin", tokenPayload);
		res.status(201).json({
			token,
		});
	} catch (error) {
		next(error);
	}
};

export const accessCard: RouteHandler = async (req, res, next) => {
	try {
		const card_id = Number(req.params.id);
		const { user_id, company_id, product_id } = req.user;
		const [query] = await card.find({ user_id, card_id });
		const { response } = query[0];
		if (response.error_code) 
			throw ErrorFactory.createError("SpError", response.message);
		const tokenPayload = {
			user_id,
			company_id,
			product_id,
			card_id
		};
		const token = createTokenFactory("admin", tokenPayload);
		const payload = {
			token
		};
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const getCard: RouteHandler = async (req, res, next) => {
	try {
		const { card_id } = req.user;
		const [query] = await card.find(card_id);
		const { response } = query[0];
		if (response.error_code) throw ErrorFactory.createError("SpError", response.message);
		res.status(200).json(response.result);
	} catch (error) {
		next(error);
	}
};
export const getCards: RouteHandler = async (req, res, next) => {
	try {
		const { product_id } = req.user;
    const [query] = await card.findAllByProductId(product_id);
    const {response} = query[0];
    if(response.error_code)
      throw ErrorFactory.createError('SpError', response.message);
    const payload = {
      cards: response.result
    };
    res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
