import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const result = await readFile(contactsPath);
    return JSON.parse(result);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const result = await readFile(contactsPath);
    const contactsList = JSON.parse(result);
    return contactsList.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    return null;
  }
}

async function updateContactById(contactId, updatedData) {
  try {
    const result = await readFile(contactsPath);
    const contactsList = JSON.parse(result);

    const contactIndex = contactsList.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex !== -1) {
      contactsList[contactIndex] = {
        ...contactsList[contactIndex],
        ...updatedData,
      };

      await writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

      return contactsList[contactIndex];
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const result = await readFile(contactsPath);
    const contactsList = JSON.parse(result);
    const index = contactsList.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const removedContact = contactsList.splice(index, 1)[0];
      await writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
      return removedContact;
    }
  } catch (error) {
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const result = await readFile(contactsPath);
    const contactList = JSON.parse(result);

    const existingContact = contactList.find(
      (contact) =>
        contact.email === email ||
        contact.name === name ||
        contact.phone === phone
    );

    if (existingContact) {
      throw new Error(
        "Contact with this email, name, or phone number already exists"
      );
    }

    const newContact = { id: nanoid(5), name, email, phone };
    const updateContactList = [...contactList, newContact];

    await writeFile(contactsPath, JSON.stringify(updateContactList, null, 2));
    return newContact;
  } catch (error) {
    throw new Error(`Error adding contact: ${error.message}`);
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
