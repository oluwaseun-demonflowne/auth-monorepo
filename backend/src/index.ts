import express from "express";
import { pool } from "./database/database";
export const app = express();
import * as dotenv from "dotenv";
import { schemaCreation } from "./database/migrate";
import userRouter from "./routes/user";

dotenv.config();
const PORT = 5003;
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/user", userRouter);

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
