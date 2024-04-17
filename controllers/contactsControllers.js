import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { getCurrentToken } from "../helpers/getCurrentToken.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateFavoriteStatus,
} from "../services/contactsServices.js";
import { checkToken } from "../services/jwtService.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const token = getCurrentToken(req);
  const ownerId = checkToken(token);
  const contacts = await listContacts(ownerId);
  res.status(200).json(contacts);
});

export const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = getCurrentToken(req);
  const ownerId = checkToken(token);
  const foundedContact = await getContactById(id, ownerId);

  if (!foundedContact) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(foundedContact);
});

export const createContact = catchAsync(async (req, res) => {
  const { name, email, phone } = req.body;
  const token = getCurrentToken(req);
  const owner = checkToken(token);
  const newContact = await addContact(name, email, phone, owner);
  if (!newContact) {
    throw HttpError(400, "Bad request");
  }

  res.status(201).json(newContact);
});

export const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = getCurrentToken(req);
  const ownerId = checkToken(token);

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Body must have at least one field",
    });
  }

  const updatedContact = await updateContactById(id, req.body, ownerId);

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
});

export const updateFavorite = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const token = getCurrentToken(req);
  const ownerId = checkToken(token);

  const updatedContact = await updateFavoriteStatus(id, favorite, ownerId);

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updatedContact);
});

export const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = getCurrentToken(req);
  const ownerId = checkToken(token);

  const removedContact = await removeContact(id, ownerId);

  if (!removedContact) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(removedContact);
});
