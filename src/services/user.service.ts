import { Service } from "typedi";
import { hashPassword, verifyPassword } from "../security/encryptation.security";
import { createTokenFactory } from "../security/token.security";
import { UserRepository } from "../repositories/user.repository";
import { ErrorFactory } from "../classes/error.class";

@Service()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	async signup(username: string, email: string, password: string): Promise<{ token: string }> {
		const hashedPassword = await hashPassword(password);
		const [query] = await this.userRepository.create({ username, email, password: hashedPassword });
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", "User already exists");
		}
		return {
			token: createTokenFactory("admin", { user_id: response.id }),
		};
	}
	async loginUser(username: string, password: string): Promise<{ token: string; auth: boolean }> {
		const [query] = await this.userRepository.findByUsername(username);
		const { response } = query[0];
		//Avoid return an error without verify the password
		if (response.error_code && response.error_code != 45000) {
			throw ErrorFactory.createError("SpError", "User not found");
		}
		const isValid = await verifyPassword(password, response.result.password);
		if (!isValid) {
			throw ErrorFactory.createError("PermissionDeniedError", "Invalid password");
		}
		//Code of user not authenticated
		if (response.error_code == 45000) {
			return {
				token: createTokenFactory("auth", { user_id: response.result.id }),
				auth: false,
			};
		}
		return {
			token: createTokenFactory("admin", { user_id: response.result.id }),
			auth: true,
		};
	}
	async auth(user_id: number): Promise<{ token: string }> {
		const [query] = await this.userRepository.authUser(user_id);
		const { response } = query[0];
		if (response.error_code) {
			throw ErrorFactory.createError("SpError", response.message);
		}
		return {
			token: createTokenFactory("admin", { user_id }),
		};
	}
}
