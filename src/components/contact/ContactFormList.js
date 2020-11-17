import React from "react";
import { v4 as uuid } from "uuid";
import ContactFormListItem from "./ContactFormListItem";

const ContactFormList = (props) => {
  let formListState, setFormListState;
  ({ formListState, setFormListState } = props);
  console.log();

  return Object.values(formListState).map((formListItem) => (
    <ContactFormListItem
      {...{
        key: uuid(),
        values: formListItem.values,
        formListState,
        setFormListState,
      }}
    />
  ));
};

export default ContactFormList;
