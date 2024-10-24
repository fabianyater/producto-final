import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./types";

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const role = req.user?.role;

  if (role !== "admin") {
    res
      .status(403)
      .json({ message: `Access denied, 'admin' role required.` });
  }

  next();
};
