import { handleRefreshToken } from "@/controllers/refreshTokenController";
import { Router } from "express";

const refreshTokenRouter = Router();
refreshTokenRouter.get("/", handleRefreshToken);

export default refreshTokenRouter;
