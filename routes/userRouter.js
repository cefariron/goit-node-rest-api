import express from "express";
import { uploadAvatar } from "../middlewars/uploadAvatar.js";
import {
  checkEmailForResend,
  checkLoginData,
  checkSignupData,
  protect,
} from "../middlewars/authMiddlewars.js";
import {
  confirmVerifyToken,
  getCurrentUser,
  login,
  logout,
  resendVerifyToken,
  setAvatar,
  signUp,
} from "../controllers/usersControllers.js";

export const userRouter = express.Router();

userRouter.post("/register", checkSignupData, signUp);
userRouter.post("/login", checkLoginData, login);
userRouter.get("/verify/:verificationToken", confirmVerifyToken);
userRouter.post("/verify", checkEmailForResend, resendVerifyToken);

userRouter.use(protect);

userRouter.get("/current", getCurrentUser);
userRouter.post("/logout", logout);
userRouter.patch("/avatars", uploadAvatar, setAvatar);

export default userRouter;
