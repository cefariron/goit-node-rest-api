import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { Contact } from "../models/contactModel.js";

export const checkContactDuplicateEmail = catchAsync(async (req, res, next) => {
    const existingContact = await Contact.exists({ email: req.body.email });
      if (existingContact) {
        return next(HttpError(409, `Sorry, contact with this email (${req.body.email}) has already  exist!`));
      }
      next();
})