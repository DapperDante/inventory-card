import { ErrorFactory } from "../classes/error.class";
import { RouteHandler } from "../interfaces/route.interface";

export const validateTokenFields = (...fields: string[]): RouteHandler => {
  return (req, res, next) => {
    const missing = fields.filter(field => !req.user[field]);
    if (missing.length > 0)
      return next(ErrorFactory.createError("PermissionDeniedError", "Access denied"));
    next();
  };
};