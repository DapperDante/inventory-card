import { Role } from "./role.interface";

export interface TokenPayload {
  role: Role,
  [key: string]: any
}