import { useContext } from "react";
import { ContactsOnCustomerContext } from "../contexts/ContactsOnCustomerContext";
import useContactContext from "./useContactContext";

const useContactsOnCustomerContext = (id) => {
  const { contactsOnCustomers } = useContext(ContactsOnCustomerContext);
  const { removeContact } = useContactContext();

  const removeContactsFromCustomer = (customerId) => {
    let contacts = contactsOnCustomers[customerId];
    Object.values(contacts).forEach((contact) => {
      removeContact(contact.id);
    });
  };

  return { removeContactsFromCustomer, contactsOnCustomers };
};

export default useContactsOnCustomerContext;
