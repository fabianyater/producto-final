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

  async searchLogBooks(
    criteria: {
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
    try {
      return await LogBookRepository.searchLogBooks(criteria, sort);
    } catch (error) {
      throw new Error("Something went wrong during search");
    }
  }

  async filterLogBooks(
    criteria: {
      startDate?: Date;
      endDate?: Date;
      latitude?: number;
      longitude?: number;
      habitatType?: string;
      climate?: string;
    },
    sort: { field: string; order: "asc" | "desc" } = {
      field: "date",
      order: "desc",
    }
  ): Promise<ILogBook[] | null> {
    try {
      return await LogBookRepository.filterLogBooks(criteria, sort);
    } catch (error) {
      throw new Error("Something went wrong during search");
    }
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
    size: number;
    pageNumber: number;
    totalPages: number;
  }> {
    const { content, totalElements, totalPages } =
      await LogBookRepository.listLogBooksPaginated(page, limit, sort);

    return {
      content,
      totalElements,
      size: limit,
      pageNumber: page,
      totalPages,
    };
  }
}

export default new UserService();
