import { useContext } from "react";
import { ContactContext } from "../contexts/ContactContext";

const useContactContext = (id) => {
  const contactContextReturn = useContext(ContactContext);
  const { dispatch } = contactContextReturn;

  const removeContact = (id) => dispatch({ type: "REMOVE_CONTACT", id });
  const addContact = (contact) => dispatch({ type: "ADD_CONTACT", contact });

  const addContacts = ({ contacts, cus_id }) => {
    Object.entries(contacts).forEach(([id, contact]) => {
      cus_id = cus_id === undefined ? contact.con_cus_id : cus_id;
      contact.con_cus_id = cus_id;

      addContact(contact);
    });
  };

  return { ...contactContextReturn, removeContact, addContact, addContacts };
};

export default useContactContext;
