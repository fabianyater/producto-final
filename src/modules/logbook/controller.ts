import { NextFunction, Request, Response } from "express";
import LogBookService from "./service";
import { ILogBook, RegisterRequestBody } from "./types";

export const addNewLogBook = async (
  req: Request<object, object, RegisterRequestBody>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const {
    title,
    location,
    weather,
    date,
    additionalObservations,
    collectedSpecies,
    habitat,
    images,
  } = req.body;

  try {
    const request: RegisterRequestBody = {
      title,
      location,
      weather,
      date,
      additionalObservations,
      collectedSpecies,
      habitat,
      images,
    };

    const response = await LogBookService.addNewLogBook(request as ILogBook);

    return res.status(201).json({
      response,
    });
  } catch (error) {
    return next(error);
  }
};
