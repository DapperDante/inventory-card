import { Request } from "express";

export interface RequestWithParams extends Request {
  user?: any;
  data?: any;
  token?: string;
}