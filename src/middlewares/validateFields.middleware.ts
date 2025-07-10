import { RouteHandler } from "../interfaces/route.interface";
import { ZodSchema } from "zod";

export const validateFields = (schema: ZodSchema): RouteHandler => {
  return (req, res, next) => {
    try{
      const validatedData = schema.parse(req.body);
      req.data = validatedData;
      next();
    }catch(error){
      return next(error);
    }
  };
};