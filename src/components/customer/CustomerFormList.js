import React from "react";
import { v4 as uuid } from "uuid";
import CustomerFormListItem from "./CustomerFormListItem";
import CustomerFormBody from "./CustomerFormBody";
import CustomerFormSelect from "./CustomerFormSelect";

const componentSelector = {
  listItem: CustomerFormListItem,
  body: CustomerFormBody,
  select: CustomerFormSelect,
};

const CustomerFormList = (props) => {
  let state, setState, values, type, Component;
  ({ state, setState, values = {}, type = "listItem" } = props);

  Component = componentSelector[type];

  return Object.entries(values).map(([id, customer]) => {
    const key = uuid();

    return <Component {...{ key, state, setState, values: customer }} />;
  });
};

export default CustomerFormList;

// switch (type) {
//   case "listItem":
//     Component = CustomerFormListItem;
//     break;

//   case "body":
//     Component = CustomerFormBody;
//     break;

//   case "select":
//     Component = CustomerSelect;
//     break;

//   default:
//     Component = CustomerFormListItem;
//     break;
// }

// let Component = type === "listItem" ? CustomerFormListItem : CustomerFormBody;
