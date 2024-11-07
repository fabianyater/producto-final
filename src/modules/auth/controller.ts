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
