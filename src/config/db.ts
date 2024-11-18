import { log } from "console";
import dotenv from "dotenv";
import moongose from "mongoose";
import { getApiUrl } from "../utils";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const getMongoUri = getApiUrl();
    const mongoURI = getMongoUri;

    if (!mongoURI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables"
      );
    }

    await moongose.connect(mongoURI);
    log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export default connectDB;
