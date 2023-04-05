const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const [contact] = contacts.filter(contact => contact.id === contactId);
  return contact || null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const contactToAdd = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(contactToAdd);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactToAdd;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
