import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { QueryResult } from "pg";
import { Profile } from "../userRegister";
import { pool } from "@/database/database";

export const handleRefreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const cookies = req.cookies;
  if (!cookies?.ticket) {res.sendStatus(401);return}
  
  const refreshToken = cookies.ticket as string;
  // if (!foundUser) return res.sendStatus(403); //unauthorized

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    async (err, decoded) => {
      if (!decoded) {
      }
      const result: QueryResult<Profile> = await pool.query(
        "SELECT * FROM profile WHERE email = $1",
        // @ts-expect-error  i can't extend the type of decoded so i had to ignore
        [decoded?.email]
      );

      // const findEmail = await db
      //     .select()
      //     .from(userSchema)
      //
      //     .where(eq(userSchema.email, decoded.email))
      //     .then((users) => users[0]);
      // @ts-expect-error  i can't extend the type of decoded so i had to ignore
      if (err || result.rows[0].email !== decoded.email) {
      }
      // return new ErrorHandler("Unauthorized", 403);
      // const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          email: result.rows[0].email,
          role: result.rows[0].role
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "30s" }
      );
      res.json({ accessToken, ...result.rows[0] });
    }
  );
};
