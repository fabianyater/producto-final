import bcrypt from "bcrypt";
import UserRepository from "./repository";
import { RegisterUserDTO } from "./types";
import { IUser } from "./User";

class UserService {
  async registerUser(userData: RegisterUserDTO): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const existingUser = await UserRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    return await UserRepository.createUser(userData as IUser);
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return await UserRepository.findUserById(userId);
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
