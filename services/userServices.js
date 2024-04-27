import { nanoid } from "nanoid";
import HttpError from "../helpers/HttpError.js";
import { emailHashCreate, passwordHashCreate } from "../helpers/createHash.js";
import { User } from "../models/userModel.js";
import { ImageServise } from "./imageService.js";
import { signToken } from "./jwtService.js";

export const signupUser = async ({ email, password, avatarURL }) => {
  const emailHash = await emailHashCreate(email);
  const passwordHash = await passwordHashCreate(password);
  avatarURL = `https://gravatar.com/avatar/${emailHash}.jpg?d=robohash`;
  const verificationToken = nanoid(32);
  const userData = {
    email,
    password: passwordHash,
    avatarURL,
    verificationToken,
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
};

export const updateAvatar = async (ownerId, user, file) => {
  if (!file) throw HttpError(400, "Bad request");

  if (file) {
    user.avatarURL = await ImageServise.saveImage(
      file,
      {
        maxFileSize: 2,
        width: 250,
        height: 250,
      },
      ownerId,
      "avatars"
    );
  }

  const databasePath = user.avatarURL.replace(/\\/g, "/");

  try {
    const updatedUser = await User.findByIdAndUpdate(
      ownerId,
      { avatarURL: databasePath },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw HttpError(401, "Not authorized");
  }
};
