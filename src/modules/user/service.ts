import bcrypt from "bcrypt";
import {
  BadRequestError,
  NotFoundError,
} from "../../common/errors/customError";
import UserRepository from "./repository";
import { RegisterUserDTO } from "./types";
import { IUser } from "./User";

class UserService {
  async registerUser(userData: RegisterUserDTO): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const existingUser = await UserRepository.findUserByEmail(userData.email);

    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    try {
      return await UserRepository.createUser(userData as IUser);
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

  async getUserById(userId: string): Promise<IUser | null> {
    const user = await UserRepository.findUserById(userId);
    console.log(user);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    return await UserRepository.findAllUsers();
  }

  async deleteUserById(userId: string): Promise<void> {
    const existingUser = await UserRepository.findUserById(userId);

    if (!existingUser) {
      throw new Error("User not found");
    }

    return await UserRepository.deleteUserById(userId);
  }
}

export default new UserService();
