import { pool } from "@/database/database";
import bcrypt from "bcryptjs";
import { type Request, type Response } from "express";
import { QueryResult } from "pg";
import { Profile } from "./userRegister";

export async function loginUser(
    request: Request,
    // Request<object, object, LoginData, object>
    response: Response
): Promise<void> {
    const { email, password } = request.body;
    console.log(email, password);

    if (!email || !password) {
        response
            .status(400)
            .json({ message: "Email and Password are required!" });
    }

    try {
        const result: QueryResult<Profile> = await pool.query(
            "SELECT * FROM profile WHERE email = $1",
            [email]
        );

        const isPasswordValid = await bcrypt.compare(
            password,
            result.rows[0].password
        );

        if (isPasswordValid) {
            response.status(200).json({ user: result.rows[0] });
            return;
        } else {
            response.status(400).json("Username or Password incorrect");
            return;
        }
    } catch (error) {
        response.status(500).json("Error while login");
    }
}
