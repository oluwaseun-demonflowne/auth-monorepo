import { logout } from "@/controllers/logout";
import { loginUser } from "@/controllers/userLogin";
import { RegisterUser } from "@/controllers/userRegister";
import { Router } from "express";
import refreshTokenRouter from "./refreshToken";
const userRouter = Router();

userRouter.post("/register", RegisterUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logout);
userRouter.get("/checkUser", refreshTokenRouter);

export default userRouter;
