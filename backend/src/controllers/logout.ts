import { type Request, type Response } from "express";

export async function logout(
  req: Request,
  res: Response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<void> {
  const cookies = req.cookies;
  console.log({ cookies }, "haha");
  // Token was never there anyway lol
  if (!cookies?.jwt) {
    res.sendStatus(204);
    return;
  }
  console.log(cookies);
  res.clearCookie("ticket", {
    httpOnly: true,
    sameSite: "strict",
    // secure: true ,    taking it out for thunder client ,has issue with it
    // secure: true
  }); // secure: true = only serves on http
  res.sendStatus(204);
}