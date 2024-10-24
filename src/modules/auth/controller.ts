import { Request, Response } from "express";
import AuthService from "./services";

interface LoginRequestBody {
  username: string;
  password: string;
}

export const login = async (
  req: Request<object, object, LoginRequestBody>,
  res: Response,
): Promise<Response | void> => {
  const { username, password } = req.body;

  try {
    const token = await AuthService.login(username, password);

    if (token) {
      return res.status(200).json({ token });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({ message: "An unknown error occurred" });
  }
};
