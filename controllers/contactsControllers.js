import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

export const getAllContacts = catchAsync(async (_req, res) => {
  const contacts = await listContacts();
  res.status(200).json({
    contacts,
  });
});

export const getOneContact = catchAsync(async (req, res) => {
    const { id } = req.params;
    const foundedContact = await getContactById(id);

    if (!foundedContact) {
      throw HttpError(404, "Not Found");
    }

    res.status(200).json({
      foundedContact,
    });
});

export const deleteContact = catchAsync(async (req, res) => {
    const { id } = req.params;
    const removedContact = await removeContact(id);

    if (!removedContact) {
      throw HttpError(404, "Not Found");
    }

    res.status(200).json({
      removedContact,
    });
});

export const createContact = catchAsync(async (req, res) => {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);

    if (!newContact) {
      throw HttpError(400, "Bad request");
    }

    res.status(201).json({
      newContact,
    });
});

export const updateContact = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Body must have at least one field",
      });
    }

    const updatedContact = await updateContactById(id, req.body);

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({
      updatedContact,
    });
});
