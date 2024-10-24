import User, { IUser } from "./User";

class UserRepository {
  async createUser(userData: IUser): Promise<IUser> {
    const newUser = new User(userData);
    return await newUser.save();
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findUserById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }

  async findAllUsers(): Promise<IUser[]> {
    return await User.find();
  }

  async deleteUserById(userId: string): Promise<void> {
    await User.findOneAndDelete({ _id: userId });
  }
}

export default new UserRepository();
