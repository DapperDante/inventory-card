import { Router } from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller";
import { applyRole } from "../middlewares/role.middleware";
import { validateFields } from "../middlewares/validateFields.middleware";

const productRoutes = Router();

productRoutes.post("/", [applyRole("admin"), validateFields("name", "description", "stock", "price")], addProduct);
productRoutes.put("/:id", [applyRole("admin"), validateFields("name", "description", "stock", "price")], updateProduct);
productRoutes.delete("/:id", applyRole("admin"), deleteProduct);
productRoutes.get("/all", applyRole("user", "admin"), getProducts);

export default productRoutes;
