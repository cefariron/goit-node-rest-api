import express from "express";
import {
  checkLoginData,
  checkSignupData,
  protect,
} from "../middlewars/authMiddlewars.js";
import {
  getCurrentUser,
  login,
  logout,
  signUp,
} from "../controllers/usersControllers.js";

export const userRouter = express.Router();

userRouter.post("/register", checkSignupData, signUp);
userRouter.post("/login", checkLoginData, login);
userRouter.get("/current", protect, getCurrentUser);
userRouter.post("/logout", protect, logout);

export default userRouter;
