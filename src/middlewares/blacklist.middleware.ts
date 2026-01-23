import { ErrorFactory } from "../classes/error.class";
import { redisComponent } from "../components/redis.component";
import { RouteHandler } from "../interfaces/route.interface";

export const checkBlacklist: RouteHandler = async (req, res, next) => {
  try{
    const { token } = req;
    const isBlackListed = await redisComponent.component.get(`blacklist:${token!}`);
    if(isBlackListed){
      throw ErrorFactory.createError("PermissionDeniedError", "You are blacklisted from this resource")
    }
    next();
  }catch(err){
    next(err);
  }
};
