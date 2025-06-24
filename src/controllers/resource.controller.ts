import { RouteHandler } from "../interfaces/route.interface";
import { ResourceRepository } from "../repositories/resource.repository";

const resource = new ResourceRepository();

export const getMethods: RouteHandler = async (req, res, next) => {
  try {
    const query = await resource.getMethods();
    res.status(200).json(query);
  } catch (error) {
    next(error);
  }
}
export const getCurrencies: RouteHandler = async (req, res, next) => {
  try{
    const query = await resource.getCurrencies();
    res.status(200).json(query)
  }catch (error){
    next(error)
  }
}
