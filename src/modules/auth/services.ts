import jwt from "jsonwebtoken";
import Permission from "../permissions/Permissions";
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

    const userPermissions = await Permission.find({ userId: user._id });
    const permissionsWithFunctionNames = userPermissions.map((perm) => ({
      functionName: perm.functionName,
      permissions: perm.permissions,
    }));

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
        permissions: permissionsWithFunctionNames,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const expirationTime: number = decoded.exp
      ? decoded.exp * 1000
      : Date.now() + 15 * 1000;

    return {
      token,
      role: user.role,
      username,
      expirationTime,
      permissions: permissionsWithFunctionNames,
    };
  }

  async validateToken(token: string): Promise<AuthResponse | null> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY as string
      ) as jwt.JwtPayload;

      const { userId, username, role } = decoded;

      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      return { token, role, username };
    } catch (error) {
      console.error("Token validation failed:", error);
      return null;
    }
  }
}

export default new AuthService();
