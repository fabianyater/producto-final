import { Request } from "express";

export type Roles = "admin" | "researcher" | "partner";

export interface AuthenticatedRequest extends Request {
  user?: {
    username: string;
    [key: string]: unknown;
  };
}

export interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface RegisterUserDTO {
  username: string;
  email: string;
  password: string;
  role: Roles;
}

export interface IUserResponse {
  id: number;
  username: string;
  email: string;
  role: Roles;
}
