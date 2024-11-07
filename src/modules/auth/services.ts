import jwt from "jsonwebtoken";
import User from "../user/User";
import { AuthResponse } from "./types";

class AuthService {
  async login(
    username: string,
    password: string
  ): Promise<AuthResponse | null> {
    const user = await User.findOne({ username });

    const invalidCredentialsError = new Error("Invalid credentials");

    if (!user) {
      throw invalidCredentialsError;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw invalidCredentialsError;
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    return { token, role: user.role, username };
  }
}

export default new AuthService();
