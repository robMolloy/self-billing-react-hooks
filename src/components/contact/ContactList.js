import React, { useContext } from "react";
import { ContactContext } from "../../contexts/ContactContext";
import ContactDetails from "./ContactDetails";

const ContactList = () => {
  const { contacts } = useContext(ContactContext);

  return Object.values(contacts).map((contact) => (
    <ContactDetails key={contact.id} contact={contact} />
  ));
};

export default ContactList;
