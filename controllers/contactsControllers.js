// import HttpError from "../helpers/HttpError.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

export const getAllContacts = async (_req, res) => {
  const contacts = await listContacts();
  res.status(200).json({
    contacts,
  });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const foundedContact = await getContactById(id);

  if (!foundedContact) {
    return res.status(404).json({
      messsage: "Not found",
    });
    // throw HttpError(404, "Not Found");
  }

  res.status(200).json({
    foundedContact,
  });
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await removeContact(id);

  if (!removedContact) {
    return res.status(404).json({
      messsage: "Not found",
    });
  }

  res.status(200).json({
    removedContact,
  });
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);

  if (!newContact) {
    return res.status(400).json({
      messsage: "Bad request",
    });
  }

  res.status(201).json({
    newContact,
  });
};

export const updateContact = async (req, res) => {
  const { id } = req.params;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Body must have at least one field",
    });
  }

  const updatedContact = await updateContactById(id, req.body);

  if (!updatedContact) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  res.status(200).json({
    updatedContact,
  });
};
