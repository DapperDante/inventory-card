import Container from "typedi";
import { RouteHandler } from "../interfaces/route.interface";
import { CompanyService } from "../services/company.service";

export const addCompany: RouteHandler = async (req, res, next) => {
	try {
		const { name } = req.data;
		const { user_id } = req.user;
		const service = Container.get(CompanyService);
		const payload = await service.createCompany(user_id, name);
		res.status(201).json(payload);
	} catch (error) {
		next(error);
	}
};

export const accessCompany: RouteHandler = async (req, res, next) => {
	try {
		const company_id = Number(req.params.id);
		const { user_id } = req.user;
		const service = Container.get(CompanyService);
		const payload = await service.accessCompany(user_id, company_id);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
}

export const getCompany: RouteHandler = async (req, res, next) => {
	try {
		const { user_id, company_id } = req.user;
		const service = Container.get(CompanyService);
		const payload = await service.getCompany(user_id, company_id);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};

// export const updateCompany: RouteHandler = async (req, res, next) => {
// 	try {
// 		const { id } = req.params;
// 		const { name, email, address } = req.body;
// 		const [query] = await companyRepository.update({ id, name, email, address });
// 		const { response } = query[0];
// 		if (response.error_code)
// 			throw ErrorFactory.createError("SpError", response.message);
// 		const payload = {
// 			message: "Company updated successfully"
// 		};
// 		res.status(200).json(payload);
// 	} catch (error) {
// 		next(error);
// 	}
// };

// export const deleteCompany: RouteHandler = async (req, res, next) => {
// 	try {
// 		const { id } = req.params;
// 		const [query] = await companyRepository.delete({ id });
// 		const { response } = query[0];
// 		if (response.error_code)
// 			throw ErrorFactory.createError("SpError", response.message);
// 		const payload = {
// 			message: "Company deleted successfully"
// 		};
// 		res.status(204).json(payload);
// 	} catch (error) {
// 		next(error);
// 	}
// };

export const getCompanies: RouteHandler = async (req, res, next) => {
	try {
		const { user_id } = req.user;
		const service = Container.get(CompanyService);
		const payload = await service.getCompanies(user_id);
		res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
};
