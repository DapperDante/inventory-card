import { Response, NextFunction } from "express";
import { RequestWithParams } from "./request.interface";

export interface RouteHandler {
  (req: RequestWithParams, res: Response, next: NextFunction): any;
}

export interface RouteSimple {
  (req: RequestWithParams, res: Response): any;
}

export interface RouteError {
  (err: any, req: RequestWithParams, res: Response, next: NextFunction): any;
}