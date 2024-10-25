import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../common/middlewars/types";
import PermissionService from "./service";

export const getPermissions = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const permissions = await PermissionService.getPermissions(
      req.user.userId,
      req.user.role
    );

    return res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
};
