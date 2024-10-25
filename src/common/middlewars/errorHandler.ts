import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";

export const errorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Para otros errores, devolvemos un 500 (Internal Server Error)
  console.error(err);
  return res.status(500).json({ message: "Internal Server Error" });
};
