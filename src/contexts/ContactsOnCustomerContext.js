import React, { createContext, useContext } from "react";
import { CustomerContext } from "./CustomerContext";
import { ContactContext } from "./ContactContext";
import isObject from "../user_modules/isObject";

export const ContactsOnCustomerContext = createContext();

const ContactsOnCustomerContextProvider = (props) => {
  const { customers } = useContext(CustomerContext);
  const { contacts } = useContext(ContactContext);

  const customerArray = Object.values(customers);
  const contactArray = Object.values(contacts);

  const contactsOnCustomers = {};

  customerArray.forEach((customer) => (contactsOnCustomers[customer.id] = {}));

  contactArray.forEach((contact) => {
    const customerId = contact.con_cus_id;
    const contactsOnCustomer = contactsOnCustomers[customerId];

    if (isObject(contactsOnCustomer)) contactsOnCustomer[contact.id] = contact;
  });

  return (
    <ContactsOnCustomerContext.Provider value={{ contactsOnCustomers }}>
      {props.children}
    </ContactsOnCustomerContext.Provider>
  );
};

export default ContactsOnCustomerContextProvider;
