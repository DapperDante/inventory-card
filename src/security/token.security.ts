import jwt from 'jsonwebtoken';
import { appEnv } from '../config/env.config';
import { AdminToken, AuthToken, GuestToken, TokenFactory, UserToken } from '../classes/token.class';
import { RoleType } from '../interfaces/role.interface';

export const createTokenFactory = (role: RoleType, extra?: any) => {
  let factory: TokenFactory;
  switch(role) {
    case 'user':
      factory = new UserToken();
      break;
    case 'admin':
      factory = new AdminToken();
      break;
    case 'guest':
      factory = new GuestToken();
      break;
    case 'auth': 
      factory = new AuthToken();
      break;
    default:
      throw new Error('Invalid role specified');
  }
  return factory.createToken(extra);
}
export const decodeToken = (token: string): any => {
  return jwt.verify(token, appEnv.JWT_SECRET);
}