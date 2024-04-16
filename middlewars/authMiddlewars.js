import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { getCurrentToken } from "../helpers/getCurrentToken.js";
import { User } from "../models/userModel.js";
import { authUserSchema } from "../schemas/userSchemas.js";
import { checkToken } from "../services/jwtService.js";
import { getUserById } from "../services/userServices.js";
import { checkUserDuplicateEmail } from "./checkUserDuplicateEmail.js";

export const checkSignupData = catchAsync(async (req, res, next) => {
  const isValid = await authUserSchema.validateAsync(req.body);

  if (!isValid) throw HttpError(400, "Bad request, error validation!");

  const userExists = await checkUserDuplicateEmail(req.body.email);

  if (userExists) throw HttpError(409, "Email in use");

  next();
});

export const checkLoginData = catchAsync(async (req, res, next) => {
  const isValid = await authUserSchema.validateAsync(req.body);

  if (!isValid) throw HttpError(401, "Email or password is wrong");

  const userExists = await checkUserDuplicateEmail(req.body.email);

  if (!userExists) throw HttpError(401, "Email or password is wrong");

  next();
});

export const protect = catchAsync(async (req, res, next) => {
  const token = getCurrentToken(req);

  if (!token) {
    throw HttpError(401, "Not authorized");
  }

  const isTokenExists = await User.findOne({ token });

  if (!isTokenExists) {
    throw HttpError(401, "Not authorized");
  }

  const userId = checkToken(token);

  if (!userId) throw HttpError(401, "Not authorized");

  const currentUser = await getUserById(userId);

  if (!currentUser) throw HttpError(401, "Not authorized");

  req.user = currentUser;

  next();
});
