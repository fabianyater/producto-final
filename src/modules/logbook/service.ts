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
      const transformedData = {
        ...data,
        collectedSpecies: data.collectedSpecies.map((species) => ({
          ...species,
          photos: (species.photos as Array<string | { url: string }>).map(
            (photo) => (typeof photo === "string" ? photo : photo.url)
          ),
        })),
      };

      return await LogBookRepository.createLogBook(transformedData as ILogBook);
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

  async getLogBookById(id: string): Promise<ILogBook | null> {
    const existingLogBook = await LogBookRepository.findLogBookById(id);

    if (!existingLogBook) {
      throw new BadRequestError("LogBook does not exist");
    }

    try {
      return existingLogBook;
    } catch (error) {
      throw new Error("Something went wrong during search");
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
      location?: string;
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

  async getUserLogBookLocations(
    userId: string
  ): Promise<{ latitude: number; longitude: number, city: string }[]> {
    try {
      return await LogBookRepository.getUserLogBookLocations(userId);
    } catch (error) {
      throw new Error("Something went wrong during search");
    }
  }
}

export default new UserService();
