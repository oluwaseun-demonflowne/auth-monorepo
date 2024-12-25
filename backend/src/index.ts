import express, { type Request, type Response } from "express";
import { pool } from "./database/database";
import cors from "cors";
export const app = express();
import * as dotenv from "dotenv";
import { schemaCreation } from "./database/migrate";
import userRouter from "./routes/user";
import refreshTokenRouter from "./routes/user/refreshToken";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = 5003;
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// @ts-expect-error
app.get("/", (_req: Request, res: Response) => res.send("Hello World!"));
app.use("/api/user", userRouter);
app.use("/api/refresh", refreshTokenRouter);

app.listen(PORT, async () => {
  try {
    await pool.connect();
    schemaCreation();
    console.log("Connected to postgres successfully");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to docker postgres");
  }
  console.log(`Running on port ${PORT}`);
});
