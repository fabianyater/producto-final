import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
