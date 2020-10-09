import { useContext } from "react";
import { CustomerContext } from "../contexts/CustomerContext";
import { ContactsOnCustomerContext } from "../contexts/ContactsOnCustomerContext";
import { v4 as uuid } from "uuid";
import { contactKeys, customerKeys } from "../object_info/keys";
import useContactReducer from "../custom_hooks/useContactReducer";
import extractObjectFromHtmlCollection from "../user_modules/extractObjectFromHtmlCollection";
import extractObjectsFromHtmlCollection from "../user_modules/extractObjectsFromHtmlCollection";

const useCustomerReducer = (id) => {
  const { dispatch } = useContext(CustomerContext);
  // const { dispatch: dispatchContact } = useContext(ContactContext);
  const { contactsOnCustomers } = useContext(ContactsOnCustomerContext);
  const { addContact } = useContactReducer();

  const { removeContact } = useContactReducer();

  const removeCustomer = (id) => {
    const contacts = contactsOnCustomers[id];
    contacts.forEach((contact) => removeContact(contact.id));
    dispatch({ type: "REMOVE_CUSTOMER", id });
  };

  const addCustomer = (customer) => {
    dispatch({ type: "ADD_CUSTOMER", customer });
  };

  const addCustomerAndContactsUsingInputs = (inputs) => {
    const customer = extractObjectFromHtmlCollection(inputs, customerKeys);
    const contacts = extractObjectsFromHtmlCollection(inputs, contactKeys);

    customer.id = uuid();
    contacts.forEach((contact) => (contact.con_cus_id = customer.id));

    addCustomer(customer);
    contacts.forEach((contact) => addContact(contact));
  };

  return { removeCustomer, addCustomer, addCustomerAndContactsUsingInputs };
};

export default useCustomerReducer;
