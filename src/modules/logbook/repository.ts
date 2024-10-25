import { FilterQuery } from "mongoose";
import LogBook from "./LogBook";
import { ILogBook } from "./types";

class LogBookRepository {
  async createLogBook(data: ILogBook): Promise<ILogBook> {
    const newLogBook = new LogBook(data);

    return await newLogBook.save();
  }

  async findLogBookById(id: string): Promise<ILogBook | null> {
    return await LogBook.findOne({ _id: id });
  }

  async searchLogBooks(query: {
    title?: string;
    date?: Date;
    latitude?: number;
    longitude?: number;
    species?: string;
  }): Promise<ILogBook[] | null> {
    const searchQuery: FilterQuery<ILogBook> = {};

    if (query.title) {
      searchQuery.title = { $regex: query.title, $options: "i" };
    }

    if (query.date) {
      const startDate = new Date(query.date);
      startDate.setUTCHours(0, 0, 0, 0);

      const endDate = new Date(query.date);
      endDate.setUTCHours(23, 59, 59, 999);

      searchQuery.date = { $gte: startDate, $lte: endDate };
    }

    if (query.latitude && query.longitude) {
      searchQuery["location.latitude"] = query.latitude;
      searchQuery["location.longitude"] = query.longitude;
    }

    if (query.species) {
      searchQuery["collectedSpecies.commonName"] = {
        $regex: query.species,
        $options: "i",
      };
    }

    return await LogBook.find(searchQuery);
  }
}

export default new LogBookRepository();
