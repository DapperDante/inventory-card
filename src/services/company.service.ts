import { Service } from "typedi";
import { createTokenFactory } from "../security/token.security";
import { ErrorFactory } from "../classes/error.class";
import { CompanyRepository } from "../repositories/company.repository";

@Service()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async createCompany(user_id: number, name: string): Promise<{ token: string }> {
    const [query] = await this.companyRepository.create({ user_id, name });
        const { response } = query[0];
        if (response.error_code) 
          throw ErrorFactory.createError("SpError", response.message);
        const payloadToken = {
          user_id,
          company_id: response.id,
        };
        const token = createTokenFactory("admin", payloadToken);
        return {
          token,
        };
  }
  async accessCompany(user_id: number, company_id: number){
    const [query] = await this.companyRepository.find({ company_id, user_id });
		const { response } = query[0];
		if (response.error_code)
			throw ErrorFactory.createError("SpError", response.message);
		const payloadToken = {
			user_id,
			company_id
		};
		const token = createTokenFactory("admin", payloadToken);
		return {
			token,
		};
  }
  async getCompany(user_id: number, company_id: number): Promise<{company: any}>{
    const [query] = await this.companyRepository.find({ company_id, user_id });
		const { response } = query[0];
		if(response.error_code)
			throw ErrorFactory.createError("SpError", response.message);
		return response.result;
  }
  async getCompanies(user_id: number): Promise<{result: any}>{
    const [query] = await this.companyRepository.findAllByUserId(user_id);
		const { response } = query[0];
		if (response.error_code)
			throw ErrorFactory.createError("SpError", response.message);
		return {
			result : response.result
		};
  }
}
