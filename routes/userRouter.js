import express from "express";
import { uploadAvatar } from "../middlewars/uploadAvatar.js";
import {
  checkLoginData,
  checkSignupData,
  protect,
} from "../middlewars/authMiddlewars.js";
import {
  getCurrentUser,
  login,
  logout,
  setAvatar,
  signUp,
} from "../controllers/usersControllers.js";

export const userRouter = express.Router();


userRouter.post("/register", checkSignupData, signUp);
userRouter.post("/login", checkLoginData, login);

userRouter.use(protect);

userRouter.get("/current", getCurrentUser);
userRouter.post("/logout", logout);
userRouter.patch("/avatars", uploadAvatar, setAvatar)

export default userRouter;