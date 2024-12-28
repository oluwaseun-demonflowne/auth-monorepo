import { Profile } from "@/controllers/userRegister";
import { type Response } from "express";
import jwt from "jsonwebtoken";

export const setTokens = (
  user: Profile,
  res: Response,
  userData: Profile
): void => {
  const accessToken = jwt.sign(
    {
      email: user.email,
      role: user.role
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "30s" }
  );
  const refreshToken = jwt.sign(
    { email: user.email, role: user.role },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "1d" }
  );

  res.cookie("ticket", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    // secure: true ,    taking it out for thunder client ,has issue with it
    maxAge: 24 * 60 * 60 * 1000
    // expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
  });
  res.cookie("sessionticket", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    // secure: true ,    taking it out for thunder client ,has issue with it
    maxAge: 30 * 1000
    // expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
  });
  res.status(200).json({ accessToken, ...userData });
};
