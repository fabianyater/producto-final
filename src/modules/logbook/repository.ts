import { FilterQuery, Types } from "mongoose";
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

  async searchLogBooks(
    query: {
      title?: string;
      date?: Date;
      latitude?: number;
      longitude?: number;
      species?: string;
    },
    sort: { field: string; order: "asc" | "desc" } = {
      field: "date",
      order: "desc",
    }
  ): Promise<ILogBook[] | null> {
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

    return await LogBook.find(searchQuery).sort({
      [sort.field]: sort.order === "asc" ? 1 : -1,
    });
  }

  async filterLogBooks(
    query: {
      startDate?: Date;
      endDate?: Date;
      location?: string;
      habitatType?: string;
      climate?: string;
    },
    sort: { field: string; order: "asc" | "desc" } = {
      field: "date",
      order: "desc",
    }
  ): Promise<ILogBook[]> {
    const searchQuery: FilterQuery<ILogBook> = {};

    if (query.startDate && query.endDate) {
      searchQuery.date = {
        $gte: new Date(query.startDate),
        $lte: new Date(query.endDate),
      };
    }

    if (query.location) {
      searchQuery["location.city"] = { $regex: query.location, $options: "i" };
    }

    if (query.habitatType) {
      searchQuery["habitat.vegetationType"] = {
        $regex: query.habitatType,
        $options: "i",
      };
    }

    if (query.climate) {
      searchQuery["habitat.climate"] = { $regex: query.climate, $options: "i" };
    }

    return await LogBook.find(searchQuery).sort({
      [sort.field]: sort.order === "asc" ? 1 : -1,
    });
  }

  async listLogBooksPaginated(
    page: number = 1,
    limit: number = 10,
    sort: { field: string; order: "asc" | "desc" } = {
      field: "date",
      order: "desc",
    }
  ): Promise<{
    content: ILogBook[];
    totalElements: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const content = await LogBook.find({})
      .sort({ [sort.field]: sort.order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    const totalElements = await LogBook.countDocuments();
    const totalPages = Math.ceil(totalElements / limit);

    return {
      content,
      totalElements,
      totalPages,
    };
  }

  async getUserLogBookLocations(
    userId: string
  ): Promise<
    { latitude: number; longitude: number; city: string; logBookId: string }[]
  > {
    const objectId = new Types.ObjectId(userId);
    const locations = await LogBook.find(
      { createdBy: objectId },
      { "location.latitude": 1, "location.longitude": 1, "location.city": 1 }
    );

    return locations.map((doc) => ({
      latitude: doc.location.latitude,
      longitude: doc.location.longitude,
      city: doc.location.city,
      logBookId: (doc._id as Types.ObjectId).toString(),
    }));
  }
}

export default new LogBookRepository();
