import React from "react";
import { v4 as uuid } from "uuid";
import CustomerFormListItem from "./CustomerFormListItem";
import CustomerFormBody from "./CustomerFormBody";

const CustomerFormList = (props) => {
  let state, setState, values, type;
  ({ state, setState, values = {}, type = "listItem" } = props);

  let Component = type === "listItem" ? CustomerFormListItem : CustomerFormBody;

  return Object.entries(values).map(([id, customer]) => {
    const key = uuid();

    return <Component {...{ key, state, setState, values: customer }} />;
  });
};

export default CustomerFormList;
