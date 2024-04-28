import { nanoid } from "nanoid";
import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { getCurrentToken } from "../helpers/getCurrentToken.js";
import { User } from "../models/userModel.js";
import { checkToken } from "../services/jwtService.js";
import {
  loginUser,
  signupUser,
  updateAvatar,
} from "../services/userServices.js";
import { EmailService } from "../services/emailService.js";

export const signUp = catchAsync(async (req, res) => {

  const response = await signupUser(req.body);

  try {
    const verifyUrl = `${req.protocol}://${req.get('host')}/users/verify/${response.newUser.verificationToken}`;

    await new EmailService(req.body, verifyUrl).sendVerifyLink()
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({
    user: {
      email: response.newUser.email,
      subscription: "starter",
    },
    msg: 'Verification link sent to your e-mail, please follow the link to verife account.'
  });
});

export const login = catchAsync(async (req, res) => {
  const response = await loginUser(req.body);

  res.status(200).json({
    token: response.token,
    user: {
      email: response.user.email,
      subscription: "starter",
    },
  });
});

export const getCurrentUser = (req, res) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

export const logout = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) throw HttpError(401, "Not authorized");

  const token = getCurrentToken(req);

  if (user.token !== token) throw HttpError(401, "Not authorized");

  user.token = null;
  await user.save();

  res.status(204).end();
});

export const setAvatar = catchAsync(async (req, res) => {
  const token = getCurrentToken(req);
  const ownerId = checkToken(token);

  const updatedUser = await updateAvatar(ownerId, req.user, req.file);

  res.status(200).json({
    avatarURL: updatedUser.avatarURL,
  });
});
