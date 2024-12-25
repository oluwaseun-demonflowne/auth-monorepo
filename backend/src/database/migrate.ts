import fs from "fs";
import path from "path";
import { pool } from "@/database/database";

export async function schemaCreation() {
  try {
    const schemaFile = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaFile, "utf-8");
    await pool.query(schema);
    console.log("Database schema has applied successfully");
  } catch (error) {
    console.error("Error applying database schema", error);
  } finally {
    // pool.end();
  }
}
