import { Router } from "express";
import { accessProduct, addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller";
import { applyRole } from "../middlewares/role.middleware";
import { validateFields } from "../middlewares/validateFields.middleware";
import { validateTokenFields } from "../middlewares/tokenFields.middleware";
import { ProductFields } from "../classes/fields.class";

const productRoutes = Router();

productRoutes.post("/", [
  applyRole("admin"), 
  validateFields(ProductFields.create), 
  validateTokenFields("company_id")
], addProduct);

productRoutes.get("/", [
  applyRole("admin"), 
  validateTokenFields("company_id", "product_id")
], getProduct);

// This route is used to access a specific product by its ID
productRoutes.post("/:id", [
  applyRole("admin"), 
  validateTokenFields("company_id")
], accessProduct);

// productRoutes.put("/", [
//   applyRole("admin"), 
//   validateTokenFields("company_id", "product_id"), 
//   validateFields("name", "description")
// ], updateProduct);

// productRoutes.delete("/", [
//   applyRole("admin"), 
//   validateTokenFields("company_id", "product_id")
// ], deleteProduct);

productRoutes.get("/all", [
  applyRole("user", "admin"), 
  validateTokenFields("company_id")
], getProducts);

export default productRoutes;
