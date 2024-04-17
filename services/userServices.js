import HttpError from "../helpers/HttpError.js";
import { passwordHashCreate } from "../helpers/createHash.js";
import { User } from "../models/userModel.js";
import { signToken } from "./jwtService.js";

export const signupUser = async ({ email, password }) => {
  const passwordHash = await passwordHashCreate(password);
  const userData = {
    email,
    password: passwordHash,
  };
  const newUser = await User.create(userData);

  return { newUser };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw HttpError(401, "Unauthorized..");

  const passwordIsValid = await user.checkUserPassword(password, user.password);

  if (!passwordIsValid) throw HttpError(401, "Email or password is wrong");

  
  const token = signToken(user._id);
  
  user.token = token;
  
  await user.save();

  user.password = undefined;
  
  return { token, user };
};

export const getUserById = async (userId) => {
  try {
    const result = await User.findOne({ _id: userId });
    return result;
  } catch (error) {
    return null;
  }
}
