import { Request, Response } from "express";
import AuthService from "./services";

interface LoginRequestBody {
  username: string;
  password: string;
}

export const login = async (
  req: Request<object, object, LoginRequestBody>,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;

  try {
    const authResponse = await AuthService.login(username, password);

    if (authResponse) {
      res.status(200).json(authResponse);
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "An unknown error occurred" });
  }
};

export const validateToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(400).json({ message: "Token is required" });
    return;
  }

  try {
    const authResponse = await AuthService.validateToken(token);

    if (authResponse) {
      res.status(200).json(authResponse);
      return;
    }

    res.status(401).json({ message: "Invalid or expired token" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "An unknown error occurred" });
  }
};
