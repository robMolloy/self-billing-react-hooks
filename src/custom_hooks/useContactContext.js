import { useContext } from "react";
import { ContactContext } from "../contexts/ContactContext";

const useContactContext = (id) => {
  const contactContextReturn = useContext(ContactContext);
  const { dispatch } = contactContextReturn;

  const removeContact = (id) => dispatch({ type: "REMOVE_CONTACT", id });
  const addContact = (contact) => dispatch({ type: "ADD_CONTACT", contact });

  const addContacts = (newContacts, customerId) => {
    Object.entries(newContacts).forEach((contactEntry) => {
      let contact = contactEntry[1];

      contact.id = contactEntry[0];
      contact.con_cus_id = customerId;

      addContact(contact);
    });
  };

  return { ...contactContextReturn, removeContact, addContact, addContacts };
};

export default useContactContext;
