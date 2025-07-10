import { Request } from "express";

export interface RequestWithExtensions extends Request {
  user?: any;
  data?: any;
}