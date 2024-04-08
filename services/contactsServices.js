import path from "path";
import { Contact } from "../models/contactModel.js";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const result = await Contact.find();
    return result;
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const result = await Contact.find({ _id: contactId });
    return result;
  } catch (error) {
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
    });
    return newContact;
  } catch (error) {
    throw new Error(`Error adding contact: ${error.message}`);
  }
}

async function updateContactById(contactId, updatedData) {
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, updatedData, {
      new: true,
    });

    return contact;
  } catch (error) {
    console.error("Ошибка при обновлении контакта:", error);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    return result;
  } catch (error) {
    return null;
  }
}

async function updateFavoriteStatus(id, favorite) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    return updatedContact;
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
