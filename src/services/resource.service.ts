import { Service } from "typedi";
import { ResourceRepository } from "../repositories/resource.repository";

@Service()
export class ResourceService {
  constructor(private resource: ResourceRepository) {}
  async getMethods(): Promise<any>{
    return {
      result: await this.resource.getMethods()
    };
  }
  async getCurrencies(): Promise<any>{
    return {
      result: await this.resource.getCurrencies()
    };
  }
  async getConcepts(): Promise<any>{
    return {
      result: await this.resource.getConcepts()
    };
  }
}