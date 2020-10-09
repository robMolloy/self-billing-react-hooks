import React, { useContext } from "react";
import { CustomerContext } from "../../contexts/CustomerContext";
import { ContactsOnCustomerContext } from "../../contexts/ContactsOnCustomerContext";
import CustomerDetails from "./CustomerDetails";

const CustomerList = () => {
  const { customers } = useContext(CustomerContext);
  const { contactsOnCustomers } = useContext(ContactsOnCustomerContext);

  return Object.values(customers).map((customer) => {
    return (
      <CustomerDetails
        key={customer.id}
        customer={customer}
        customerContacts={contactsOnCustomers[customer.id]}
      />
    );
  });
};

export default CustomerList;
