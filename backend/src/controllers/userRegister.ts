import { pool } from "@/database/database";
import { encryptPassword } from "@/utils/encryptPassword";
import { type Request, type Response } from "express";

export type Profile = {
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
};

type Error = {
  routine: string;
};

export async function RegisterUser(
  request: Request<object, object, Profile, object>,
  response: Response
): Promise<void> {
  const { email, name, role, password } = request.body;
  if (!email || !password || !name || !role) {
    throw new Error("a field is empty");
  }
  if (role !== "admin" && role !== "user") {
    response.status(500).json("Role must either be admin or user");
    return;
  }

  try {
    const encryptPass = await encryptPassword(password);
    await pool.query(
      ' INSERT INTO "profile" ( name,email,role,password ) VALUES ($1, $2, $3, $4)',
      [name, email, role, encryptPass]
    );
    response.status(201).json("User successfully registered");
  } catch (error: unknown) {
    // _bt_check_unique
    const errorMsg = error as unknown as Error;
    if (errorMsg.routine === "_bt_check_unique") {
      response.status(500).json("Email has been used to register");
      return;
    }
    response.status(500).json("Error while registering");
  }
}
