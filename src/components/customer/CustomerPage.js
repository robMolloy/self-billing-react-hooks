import React from "react";

import CustomerForm from "./CustomerForm";
import CustomerDetailsList from "./CustomerDetailsList";

import CustomerContextProvider from "../../contexts/CustomerContext";
import ContactContextProvider from "../../contexts/ContactContext";
import ContactsOnCustomerContextProvider from "../../contexts/ContactsOnCustomerContext";

const CustomerPage = () => {
  return (
    <ContactContextProvider>
      <CustomerContextProvider>
        <ContactsOnCustomerContextProvider>
          <CustomerForm />
          <CustomerDetailsList />
        </ContactsOnCustomerContextProvider>
      </CustomerContextProvider>
    </ContactContextProvider>
  );
};

export default CustomerPage;
