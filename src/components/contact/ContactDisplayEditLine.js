import React from "react";
import ContactSubForm from "./ContactSubForm";

const ContactDisplayEditLine = ({ edit = true, ...props }) => {
  return edit ? (
    <ContactSubForm {...props} />
  ) : (
    <ContactDisplayLine {...props} />
  );
};

export default ContactDisplayEditLine;
