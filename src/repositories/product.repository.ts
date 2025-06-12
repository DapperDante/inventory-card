import { CRUD } from "../interfaces/crud.interface";
import { Product } from "../models/relation";

export class ProductRepository implements CRUD{
	create(data: any) {
		return Product.create(data);
	}
	find(id: number) {
		return Product.findByPk(id);
	}
  update(product: any, data: any) {
    return product.update(data);
  }
  delete(product: any) {
    return product.destroy();
  }
	findAllByUserId(userId: number) {
		return Product.findAll({ where: { user_id: userId } });
	}
}
