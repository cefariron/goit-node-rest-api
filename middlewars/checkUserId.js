import { Types } from "mongoose";
import { catchAsync } from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contactModel.js";

export const checkUserId = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const idIsValid = Types.ObjectId.isValid(id);

    if(!idIsValid) throw HttpError(404, "Contact not found!");

    const contact = await Contact.findById(id);

    if (!contact) throw HttpError(404, "Contact not found!");

    req.contact = contact;

    next();
})