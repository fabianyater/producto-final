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
    createdBy,
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
      createdBy,
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
    const field = req.query.field ? String(req.query.field) : "date";
    const order: "asc" | "desc" =
      req.query.order === "asc" || req.query.order === "desc"
        ? req.query.order
        : "desc";

    const searchCriteria = {
      title: title?.toString(),
      date: date ? new Date(date.toString()) : undefined,
      latitude: latitude ? parseFloat(latitude.toString()) : undefined,
      longitude: longitude ? parseFloat(longitude.toString()) : undefined,
      species: species?.toString(),
    };

    const sort = { field, order };

    const logBooks = await LogBookService.searchLogBooks(searchCriteria, sort);
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
    const { startDate, endDate, location, habitatType, climate } = req.query;

    const field = req.query.field ? String(req.query.field) : "date";
    const order: "asc" | "desc" =
      req.query.order === "asc" || req.query.order === "desc"
        ? req.query.order
        : "desc";

    const filterCriteria = {
      startDate: startDate ? new Date(startDate.toString()) : undefined,
      endDate: endDate ? new Date(endDate.toString()) : undefined,
      location: location ? String(location) : undefined,
      habitatType: habitatType?.toString(),
      climate: climate?.toString(),
    };

    const sort = { field, order };

    const logBooks = await LogBookService.filterLogBooks(filterCriteria, sort);
    res.status(200).json(logBooks);
  } catch (error) {
    return next(error);
  }
};

export const listLogBooksPaginated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { page, limit, field, order } = req.query;

  const pageNumber = page ? parseInt(page as string, 10) : 1;
  const pageSize = limit ? parseInt(limit as string, 10) : 10;
  const sortField = field ? String(field) : "date";
  const sortOrder: "asc" | "desc" =
    order === "asc" || order === "desc" ? order : "asc";

  try {
    const logBooks = await LogBookService.listLogBooksPaginated(
      pageNumber,
      pageSize,
      { field: sortField, order: sortOrder }
    );
    return res.json(logBooks);
  } catch (error) {
    return next(error);
  }
};

export interface AuthenticatedRequest extends Request {
  logBook?: {
    id: string;
    [key: string]: unknown;
  };
}

export const getLogBookById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const logBookId = req.params.id;

    if (logBookId) {
      const logBook = await LogBookService.getLogBookById(logBookId);

      return res.status(200).json(logBook);
    } else {
      return res.status(404).json({ message: "LogBook not found" });
    }
  } catch (error) {
    return next(error);
  }
};

export const getUserLogBookLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const locations = await LogBookService.getUserLogBookLocations(userId);

    return res.status(200).json(locations);
  } catch (error) {
    return next(error);
  }
};
