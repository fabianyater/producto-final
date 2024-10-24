import { NextFunction, Request, Response } from "express";

import UserService from "./service";
import {
  AuthenticatedRequest,
  IUserResponse,
  RegisterRequestBody,
  RegisterUserDTO,
  Roles,
} from "./types";
import { IUser } from "./User";

const registerUser = async (
  req: Request<object, object, RegisterRequestBody>,
  res: Response,
  next: NextFunction,
  role: Roles
): Promise<Response | void> => {
  const { username, email, password } = req.body;

  try {
    const userData: RegisterUserDTO = {
      username,
      email,
      password,
      role,
    };

    const user = await UserService.registerUser(userData);

    return res.status(201).json({
      message: `${
        role.charAt(0).toUpperCase() + role.slice(1)
      } registration successful`,
      user,
    });
  } catch (error) {
    return next(error);
  }
};

export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    if (req.user) {
      const user = await UserService.getUserById(req.user.userId as string);

      if (user) {
        const userFound: IUserResponse = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        };

        return res.status(200).json(userFound);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return next(error);
  }
};

export const getUsers = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const users: IUser[] = await UserService.getAllUsers();

    if (users.length > 0) {
      const transformedUsers: IUserResponse[] = users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      }));

      return res.status(200).json(transformedUsers);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    return next(error);
  }
};

export const registerResearcher = async (
  req: Request<object, object, RegisterRequestBody>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  return registerUser(req, res, next, "researcher");
};

export const registerPartner = async (
  req: Request<object, object, RegisterRequestBody>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  return registerUser(req, res, next, "partner");
};

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.userId;

    await UserService.deleteUserById(userId);

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    next(error); 
  }
};
