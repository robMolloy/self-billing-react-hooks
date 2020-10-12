import { useContext } from "react";
import { ContactContext } from "../contexts/ContactContext";

const useContactReducer = (id) => {
  const { dispatch } = useContext(ContactContext);

  const removeContact = (id) => dispatch({ type: "REMOVE_CONTACT", id });
  const addContact = (contact) => dispatch({ type: "ADD_CONTACT", contact });

  const addContacts = (contacts, customerId) => {
    console.log(contacts);

    Object.entries(contacts).forEach((contactEntry) => {
      let contact = contactEntry[1];

      contact.id = contactEntry[0];
      contact.con_cus_id = customerId;

      addContact(contact);
    });
  };

  return { removeContact, addContact, addContacts };
};

export default useContactReducer;
