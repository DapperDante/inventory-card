import { Router } from "express";
import { applyRole } from "../middlewares/role.middleware";
import { getConcepts, getCurrencies, getMethods } from "../controllers/resource.controller";

const resourceRoutes = Router();

resourceRoutes.get("/method", [
  applyRole("admin")
], getMethods);

resourceRoutes.get('/currency', [
  applyRole("admin")
], getCurrencies);

resourceRoutes.get("/concept", [
  applyRole("admin")
], getConcepts);

export default resourceRoutes;
