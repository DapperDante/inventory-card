import { Service } from "typedi";
import { MovementRepository } from "../repositories/movement.repository";
import { ErrorFactory } from "../classes/error.class";

@Service()
export class MovementService {
	constructor(private movementRepository: MovementRepository) {}

	async initialBalance(
		user_id: number,
		card_id: number,
		quantity: number,
		unit_cost: number
	): Promise<any> {
		const [query] = await this.movementRepository.initialBalance({
			user_id,
			card_id,
			quantity,
			unit_cost,
		});
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", response.message);
		}
		return {
			message: response.message,
		};
	}

	async purchase(
		user_id: number,
		card_id: number,
		quantity: number,
		unit_cost: number
	): Promise<any> {
		const [query] = await this.movementRepository.purchase({
			user_id,
			card_id,
			quantity,
			unit_cost,
		});
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", response.message);
		}
		return {
			message: response.message,
		};
	}

	async sale(user_id: number, card_id: number, quantity: number): Promise<any> {
		const [query] = await this.movementRepository.sale({ user_id, card_id, quantity });
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", response.message);
		}
		return {
			message: response.message,
		};
	}

	async purchaseReturn(user_id: number, card_id: number, quantity: number): Promise<any> {
		const [query] = await this.movementRepository.purchaseReturn({ user_id, card_id, quantity });
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", response.message);
		}
		return {
			message: response.message,
		};
	}

	async saleReturn(user_id: number, card_id: number, quantity: number): Promise<any> {
		const [query] = await this.movementRepository.saleReturn({ user_id, card_id, quantity });
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", response.message);
		}
		return {
			message: response.message,
		};
	}

	async productionRequired(user_id: number, card_id: number, quantity: number): Promise<any> {
		const [query] = await this.movementRepository.productionRequired({
			user_id,
			card_id,
			quantity,
		});
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", response.message);
		}
		return {
			message: response.message,
		};
	}

	async productionReturn(user_id: number, card_id: number, quantity: number): Promise<any> {
		const [query] = await this.movementRepository.productionReturn({ user_id, card_id, quantity });
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", response.message);
		}
		return {
			message: response.message,
		};
	}

	async getMovements(user_id: number, card_id: number): Promise<any> {
		const [query] = await this.movementRepository.getMovements({ user_id, card_id });
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", response.message);
		}
		return {
			result: response.result,
		};
	}
	async getBalance(card_id: number): Promise<any> {
		const [query] = await this.movementRepository.getBalance({ card_id });
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", response.message);
		}
		return {
			result: response.result,
		};
	}
}
