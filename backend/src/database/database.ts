import { Pool } from "pg";

export const pool = new Pool({
    user: "admin",
    host: "localhost",
    database: "blog",
    // password: process.env.DB_PASSWORD!,
    password: "admin",
    port: 5433
});

// async () => {
//     try {
//         const client = await pool.connect();
//         console.log("Connected to Docker Postgres");
//         client.release();
//     } catch (error) {

//     }
// };
