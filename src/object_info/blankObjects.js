import { contactBlankRow, customerBlankRow } from "./blankRows";
import { v4 as uuid } from "uuid";

const getBlankObject = (blankRow, n = 1, values = {}) => {
  let object = {};
  for (let i = 0; i < n; i++) {
    const id = uuid();
    object[id] = { ...blankRow, id, ...values };
  }
  return object;
};

export const getBlankContacts = (n = 1, values = {}) => {
  return getBlankObject(contactBlankRow, n, values);
};

export const getBlankCustomers = (n = 1, values = {}) => {
  return getBlankObject(customerBlankRow, n, values);
};
