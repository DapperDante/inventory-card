import { Router } from "express";
import { applyRole } from "../middlewares/role.middleware";
import { getCurrencies, getMethods } from "../controllers/resource.controller";

const resourceRoutes = Router();

resourceRoutes.get("/method", [
  applyRole("admin")
], getMethods);

resourceRoutes.get('/currency', [
  applyRole("admin")
], getCurrencies);

resourceRoutes.get("/movement", [
  applyRole("admin")
], getMethods);

export default resourceRoutes;
