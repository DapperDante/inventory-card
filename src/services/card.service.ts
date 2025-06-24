import { Service } from "typedi";
import { CardRepository } from "../repositories/card.repository";
import { createTokenFactory } from "../security/token.security";
import { ErrorFactory } from "../classes/error.class";

@Service()
export class CardService {
	constructor(private cardRepository: CardRepository) {}
	async createCard(
		user_id: number,
    company_id: number,
		product_id: number,
		method_id: number,
		currency_id: number,
		name: string,
		description: string,
		date: Date
	){
    const [query] = await this.cardRepository.create({
      user_id,
      method_id,
      product_id,
      currency_id,
      name,
      description,
      date,
    });
    const { response } = query[0];
    if (response.error_code) {
      throw ErrorFactory.createError("SpError", response.message);
    }
    const tokenPayload = {
      user_id,
      company_id,
      product_id,
      card_id: response.result.id,
    };
    return {
      token: createTokenFactory("admin", tokenPayload)
    }
  }
  async accessCard(
    user_id: number,
    company_id: number,
    product_id: number,
    card_id: number
  ) {
    const [query] = await this.cardRepository.find({
      user_id,
      card_id
    });
    const { response } = query[0];
    if (response.error_code) {
      throw ErrorFactory.createError("SpError", response.message);
    }
    const tokenPayload = {
      user_id,
      company_id,
      product_id,
      card_id
    };
    return {
      token: createTokenFactory("admin", tokenPayload)
    };
  }
  async getCard(user_id: number, card_id: number): Promise<any>{
    const [query] = await this.cardRepository.find({
      user_id,
      card_id
    });
    const { response } = query[0];
    if (response.error_code) {
      throw ErrorFactory.createError("SpError", response.message);
    }
    return {
      card: response.result
    };
  }
  async getCards(product_id: number): Promise<any>{
    const [query] = await this.cardRepository.findAllByProductId(product_id);
    const { response } = query[0];
    if (response.error_code) {
      throw ErrorFactory.createError("SpError", response.message);
    }
    return {
      cards: response.result
    };
  }
}
