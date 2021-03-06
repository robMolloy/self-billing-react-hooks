import React from "react";
import ContactDetails from "./ContactDetails";
import { v4 as uuid } from "uuid";

const ContactDetailsList = ({ contacts }) => {
  return Object.entries(contacts).map(([id, contactRow]) => (
    <ContactDetails key={uuid()} contact={{ [id]: contactRow }} />
  ));
};

export default ContactDetailsList;
