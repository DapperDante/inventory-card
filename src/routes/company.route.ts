import { Router } from "express";
import { validateFields } from "../middlewares/validateFields.middleware";
import { accessCompany, addCompany, getCompanies, getCompany } from "../controllers/company.controller";
import { applyRole } from "../middlewares/role.middleware";
import { validateTokenFields } from "../middlewares/tokenFields.middleware";
import { CompanyFields } from "../classes/fields.class";

const companyRoutes = Router();

companyRoutes.post('/', [
  applyRole('admin'), 
  validateFields(CompanyFields.create)
], addCompany);

// This endpoint gives an token with the company_id
companyRoutes.post('/:id', [
  applyRole('admin'), 
], accessCompany);

companyRoutes.get('/', [
  applyRole('admin'), 
  validateTokenFields("company_id")
], getCompany);

// companyRoutes.put('/', [
//   applyRole('admin'), 
//   validateTokenFields("company_id"), 
//   validateFields("name", "email", "address")
// ], updateCompany);

// companyRoutes.delete('/', [
//   applyRole('admin'), 
//   validateTokenFields("company_id")
// ], deleteCompany);

companyRoutes.get('/all', [
  applyRole('admin')
], getCompanies);

export default companyRoutes;
