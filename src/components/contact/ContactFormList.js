import React from "react";
import { v4 as uuid } from "uuid";
import ContactFormListItem from "./ContactFormListItem";

const ContactFormList = (props) => {
  let formListState, setFormListState;
  ({ formListState, setFormListState } = props);

  return Object.values(formListState).map((formListItem) => {
    const { values } = formListItem;
    const key = uuid();

    return (
      <ContactFormListItem
        {...{ key, values, formListState, setFormListState }}
      />
    );
  });
};

export default ContactFormList;
