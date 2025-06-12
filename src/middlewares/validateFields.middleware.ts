import { ErrorFactory } from "../classes/error.class";
import { RouteHandler } from "../interfaces/route.interface";

export const validateFields = (...fields: string[]): RouteHandler => {
  return (req, res, next) => {
    if(!req.body)
      next(ErrorFactory.createError("InvalidationFieldsError", "Request body is required"));
    const missing = fields.filter(field => !req.body[field]);
    if (missing.length > 0)
      next(ErrorFactory.createError("InvalidationFieldsError", `Missing required fields: ${missing.join(", ")}`));
    next();
  };
};