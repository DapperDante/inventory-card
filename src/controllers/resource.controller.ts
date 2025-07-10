import Container from "typedi";
import { RouteHandler } from "../interfaces/route.interface";
import { ResourceService } from "../services/resource.service";

export const getMethods: RouteHandler = async (req, res, next) => {
  try {
    const service = Container.get(ResourceService);
    const query = await service.getMethods();
    res.status(200).json(query);
  } catch (error) {
    next(error);
  }
}
export const getCurrencies: RouteHandler = async (req, res, next) => {
  try {
    const service = Container.get(ResourceService);
    const query = await service.getCurrencies();
    res.status(200).json(query);
  } catch (error) {
    next(error)
  }
}
export const getConcepts: RouteHandler = async (req, res, next) => {
  try {
    const resource = Container.get(ResourceService);
    const query = await resource.getConcepts();
    res.status(200).json(query);
  } catch (error) {
    next(error);
  }
}
