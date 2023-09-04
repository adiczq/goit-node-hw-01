const { error } = require("console");
const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error(message);
    throw err;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    return result;
  } catch (err) {
    console.error(message);
    throw err;
  }
}

async function updateSourceFile(instance) {
  try {
    fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
  } catch (err) {
    console.error(message);
    throw err;
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const deleteContact = allContacts.filter(({ id }) => id !== contactId);
    updateSourceFile(deleteContact);
    return allContacts.filter(({ id }) => id === contactId);
  } catch (err) {
    console.error(message);
    throw err;
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: v4(), name: name, email: email, phone: phone };
    const allContacts = await listContacts();
    const addNewContact = [...allContacts, newContact];
    updateSourceFile(addNewContact);
    return newContact;
  } catch (err) {
    console.error(message);
    throw err;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateSourceFile,
};
