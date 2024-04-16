import path from "path";
import { Contact } from "../models/contactModel.js";

const contactsPath = path.join("db", "contacts.json");

async function listContacts(ownerId) {
  try {
    const result = await Contact.find({ owner: ownerId });
    return result;
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId, ownerId) {
  try {
    const result = await Contact.findOne({ _id: contactId, owner: ownerId });
    return result;
  } catch (error) {
    return null;
  }
}

async function addContact(name, email, phone, owner) {
  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
      owner,
    });
    return newContact.toObject({ versionKey: false });
  } catch (error) {
    throw new Error(`Error adding contact: ${error.message}`);
  }
}

async function updateContactById(contactId, updatedData, ownerId) {
  try {
    const contact = await Contact.findOneAndUpdate({ _id: contactId, owner: ownerId }, updatedData, {
      new: true,
    });

    return contact;
  } catch (error) {
    console.error("Ошибка при обновлении контакта:", error);
    return null;
  }
}

async function updateFavoriteStatus(id, favorite, ownerId) {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner: ownerId },
      { favorite },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    return null;
  }
}

async function removeContact(contactId, ownerId) {
  try {
    const result = await Contact.findOneAndDelete({ _id: contactId, owner: ownerId });
    return result;
  } catch (error) {
    return null;
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateFavoriteStatus,
};
