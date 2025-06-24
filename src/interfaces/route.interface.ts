import { Response, NextFunction } from "express";
import { RequestWithExtensions } from "./request.interface";

export interface RouteHandler {
  (req: RequestWithExtensions, res: Response, next: NextFunction): any;
}

export interface RouteSimple {
  (req: RequestWithExtensions, res: Response): any;
}

export interface RouteError {
  (err: any, req: RequestWithExtensions, res: Response, next: NextFunction): any;
}