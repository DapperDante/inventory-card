import { ErrorFactory } from "../classes/error.class";
import { RouteHandler } from "../interfaces/route.interface";
import { decodeToken } from "../security/token.security";

export const authenticateToken: RouteHandler = (req, res, next) => {
  try{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
      throw ErrorFactory.createError("PermissionDeniedError", "No token provided");
    }
    const decoded = decodeToken(token);
    req.user = decoded;
    req.token = token;
    next();
  }catch(error){
    next(error);
  }
}