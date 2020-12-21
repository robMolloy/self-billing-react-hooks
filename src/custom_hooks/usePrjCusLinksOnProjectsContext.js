import { useContext } from "react";
import { ContactsOnCustomerContext } from "../contexts/ContactsOnCustomerContext";
import useContactContext from "./useContactContext";
import useCustomerContext from "./useCustomerContext";

const useContactsOnCustomerContext = () => {
  // const { contactsOnCustomers } = useContext(ContactsOnCustomerContext);
  // const { removeContact, addContacts } = useContactContext();
  // const { addCustomer } = useCustomerContext();

  // const removeContactsFromCustomer = (customerId) => {
  //   let contacts = contactsOnCustomers[customerId];
  //   Object.values(contacts).forEach((contact) => {
  //     removeContact(contact.id);
  //   });
  // };

  // const addContactsOnCustomer = ({ customer, contacts }) => {
  //   customer = addCustomer(customer);
  //   const cus_id = customer.id;
  //   addContacts({ contacts, cus_id });
  // };

  return {
    // removeContactsFromCustomer,
    // contactsOnCustomers,
    // addContactsOnCustomer,
  };
};

export default useContactsOnCustomerContext;
