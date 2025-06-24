import { ErrorFactory } from "../classes/error.class";
import { RouteHandler } from "../interfaces/route.interface";
import { CompanyRepository } from "../repositories/company.repository";
import { createTokenFactory } from "../security/token.security";

const companyRepository = new CompanyRepository();

export const addCompany: RouteHandler = async (req, res, next) => {
	try {
		const { name } = req.body;
		const { user_id } = req.user;
		const [query] = await companyRepository.create({ user_id, name });
		const { response } = query[0];
		if (response.error_code) 
			throw ErrorFactory.createError("SpError", response.message);
		const payloadToken = {
			user_id,
			company_id: response.id,
		};
		const token = createTokenFactory("admin", payloadToken);
		const payload = {
			token,
		};
		res.status(201).json(payload);
	} catch (error) {
		next(error);
	}
};
export const accessCompany: RouteHandler = async (req, res, next) => {
	try {
		const company_id = Number(req.params.id);
		const { user_id } = req.user;
		const [query] = await companyRepository.find({ company_id, user_id });
		const { response } = query[0];
		if (response.error_code)
			throw ErrorFactory.createError("SpError", response.message);
		const payloadToken = {
			user_id,
			company_id
		};
		const token = createTokenFactory("admin", payloadToken);
		const payload = {
			token,
		};
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
}
export const getCompany: RouteHandler = async (req, res, next) => {
	try {
		const { user_id, company_id } = req.user;
		const [query] = await companyRepository.find({ company_id, user_id });
		const { response } = query[0];
		if(response.error_code)
			throw ErrorFactory.createError("SpError", response.message);
		const payload = {
			company: response.result
		}
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const updateCompany: RouteHandler = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, email, address } = req.body;
		const [query] = await companyRepository.update({ id, name, email, address });
		const { response } = query[0];
		if (response.error_code)
			throw ErrorFactory.createError("SpError", response.message);
		const payload = {
			message: "Company updated successfully"
		};
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
export const deleteCompany: RouteHandler = async (req, res, next) => {
	try {
		const { id } = req.params;
		const [query] = await companyRepository.delete({ id });
		const { response } = query[0];
		if (response.error_code)
			throw ErrorFactory.createError("SpError", response.message);
		const payload = {
			message: "Company deleted successfully"
		};
		res.status(204).json(payload);
	} catch (error) {
		next(error);
	}
};
export const getCompanies: RouteHandler = async (req, res, next) => {
	try {
		const { user_id } = req.user;
		const [query] = await companyRepository.findAllByUserId(user_id);
		const { response } = query[0];
		if (response.error_code)
			throw ErrorFactory.createError("SpError", response.message);
		const payload = {
			companies : response.result
		};
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
