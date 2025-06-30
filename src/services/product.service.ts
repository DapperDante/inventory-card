import { Service } from "typedi";
import { ProductRepository } from "../repositories/product.repository";
import { ErrorFactory } from "../classes/error.class";
import { createTokenFactory } from "../security/token.security";

@Service()
export class ProductService {
	constructor(private productRepository: ProductRepository) {}
	async createProduct(
		user_id: number,
		company_id: number,
		name: string,
		description: string
	): Promise<{ token: string }> {
		const [query] = await this.productRepository.create({ user_id, company_id, name, description });
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", response.message);
		}
		const payloadToken = {
			user_id,
			company_id,
			product_id: response.result.id,
		};
		const token = createTokenFactory("admin", payloadToken);
		return {
			token,
		};
	}
	async accessProduct(
		user_id: number,
		company_id: number,
		product_id: number
	): Promise<{ token: string }> {
		const [query] = await this.productRepository.find({ product_id, company_id });
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", response.message);
		}
		const payloadToken = {
			user_id,
			company_id,
			product_id,
		};
		const token = createTokenFactory("admin", payloadToken);
		return {
			token,
		};
	}
	async getProduct(company_id: number, product_id: number): Promise<any> {
		const [query] = await this.productRepository.find({ product_id, company_id });
    const { response } = query[0];
    if (response.error_code) {
        throw ErrorFactory.createError("SpError", response.message);
    }
    return response.result;
	}
  async getProducts(company_id: number): Promise<any>{
    const [query] = await this.productRepository.findAllByCompanyId(company_id);
    const { response } = query[0];
    if (response.error_code) {
      throw ErrorFactory.createError("SpError", response.message);
    }
    return {
      result: response.result
    }
  }
}
