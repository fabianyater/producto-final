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
}

export default new LogBookRepository();
