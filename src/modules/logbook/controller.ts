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

export const searchLogBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { title, date, latitude, longitude, species } = req.query;

    const searchCriteria = {
      title: title?.toString(),
      date: date ? new Date(date.toString()) : undefined,
      latitude: latitude ? parseFloat(latitude.toString()) : undefined,
      longitude: longitude ? parseFloat(longitude.toString()) : undefined,
      species: species?.toString(),
    };

    const logBooks = await LogBookService.searchLogBooks(searchCriteria);
    res.status(200).json(logBooks);
  } catch (error) {
    return next(error);
  }
};

export const filterLogBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { startDate, endDate, latitude, longitude, habitatType, climate } =
      req.query;

    const filterCriteria = {
      startDate: startDate ? new Date(startDate.toString()) : undefined,
      endDate: endDate ? new Date(endDate.toString()) : undefined,
      latitude: latitude ? parseFloat(latitude.toString()) : undefined,
      longitude: longitude ? parseFloat(longitude.toString()) : undefined,
      habitatType: habitatType?.toString(),
      climate: climate?.toString(),
    };

    const logBooks = await LogBookService.filterLogBooks(filterCriteria);
    res.status(200).json(logBooks);
  } catch (error) {
    return next(error);
  }
};
