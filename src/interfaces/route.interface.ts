import { Response, NextFunction } from "express";
import { RequestWithUser } from "./request.interface";

export interface RouteHandler {
  (req: RequestWithUser, res: Response, next: NextFunction): any;
}

export interface RouteSimple {
  (req: RequestWithUser, res: Response): any;
}

export interface RouteError {
  (err: any, req: RequestWithUser, res: Response, next: NextFunction): any;
}