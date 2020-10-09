import React from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import ContactContextProvider from "../../contexts/ContactContext";
import CustomerContextProvider from "../../contexts/CustomerContext";

const ContactPage = () => {
  return (
    <CustomerContextProvider>
      <ContactContextProvider>
        <ContactForm />
        <ContactList />
      </ContactContextProvider>
    </CustomerContextProvider>
  );
};

export default ContactPage;
