import jwt from "jsonwebtoken";
import User from "../user/User";

class AuthService {
  async login(username: string, password: string): Promise<string | null> {
    const user = await User.findOne({ username });

    const invalidCredentialsError = new Error("Invalid credentials");

    if (!user) {
      throw invalidCredentialsError;
    }

    const passwordMatch = user.comparePassword(user.password);

    if (!passwordMatch) {
      throw invalidCredentialsError;
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    return token;
  }
}

export default new AuthService();
