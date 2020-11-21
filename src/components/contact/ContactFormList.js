import React from "react";
import { v4 as uuid } from "uuid";
import ContactFormListItem from "./ContactFormListItem";

const ContactFormList = (props) => {
  let state, setState, values;
  ({ state, setState, values = {} } = props);

  return Object.entries(values).map(([id, contact]) => {
    const key = uuid();

    return (
      <ContactFormListItem {...{ key, state, setState, values: contact }} />
    );
  });
};

export default ContactFormList;
