import React, { useContext } from "react";
import { CustomerContext } from "../../contexts/CustomerContext";
import { ContactsOnCustomerContext } from "../../contexts/ContactsOnCustomerContext";
import CustomerDetails from "./CustomerDetails";
import MainContainer from "../customComponents/MainContainer";

const CustomerList = () => {
  const { customers } = useContext(CustomerContext);
  const { contactsOnCustomers } = useContext(ContactsOnCustomerContext);

  const customerArray = Object.values(customers);

  return (
    <MainContainer>
      {customerArray.map((customer) => (
        <CustomerDetails
          key={customer.id}
          customer={customer}
          customerContacts={contactsOnCustomers[customer.id]}
        />
      ))}
    </MainContainer>
  );
};

export default CustomerList;
