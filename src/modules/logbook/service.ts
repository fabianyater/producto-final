import { BadRequestError } from "../../common/errors/customError";
import LogBookRepository from "./repository";
import { ILogBook } from "./types";

class UserService {
  async addNewLogBook(data: ILogBook): Promise<ILogBook> {
    const existingLogBook = await LogBookRepository.findLogBookById(data.id);

    if (existingLogBook) {
      throw new BadRequestError("LogBook already exists");
    }

    try {
      return await LogBookRepository.createLogBook(data);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(
          (err: any) => err.message
        );
        throw new BadRequestError(`Validation failed: ${messages.join(", ")}`);
      }

      if (error.code === 11000) {
        throw new BadRequestError(
          `Duplicate field: ${Object.keys(error.keyValue).join(", ")}`
        );
      }

      throw new Error("Something went wrong");
    }
  }

  async searchLogBooks(criteria: {
    title?: string;
    date?: Date;
    latitude?: number;
    longitude?: number;
    species?: string;
  }): Promise<ILogBook[] | null> {
    try {
      return await LogBookRepository.searchLogBooks(criteria);
    } catch (error) {
      throw new Error("Something went wrong during search");
    }
  }
}

export default new UserService();
