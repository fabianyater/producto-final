import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "./types";

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as {
      userId: string;
      username: string;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
