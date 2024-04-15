import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";

export const checkUserDuplicateEmail = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    return existingUser;
  } catch (error) {
    throw HttpError(500, 'Internal Server Error');
  }
};


