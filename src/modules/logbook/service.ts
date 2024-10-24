import LogBookRepository from "./repository";
import { ILogBook } from "./types";

class UserService {
  async addNewLogBook(data: ILogBook): Promise<ILogBook> {
    const existingLogBook = await LogBookRepository.findLogBookById(data.id);
    console.log(existingLogBook);

    if (existingLogBook) {
      throw new Error("LogBook already exists");
    }

    return await LogBookRepository.createLogBook(data);
  }
}

export default new UserService();
