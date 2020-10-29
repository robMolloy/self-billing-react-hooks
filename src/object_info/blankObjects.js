import { v4 as uuid } from "uuid";
import { contactBlankRow, customerBlankRow } from "./blankRows";

const getBlankObject = (blankRow, n = 1, values = {}) => {
  let object = {};
  for (let i = 0; i < n; i++) {
    const id = uuid();
    object[id] = { ...blankRow, ...values, id };
  }
  return object;
};

export const getBlankContacts = (n = 1, values = {}) => {
  return getBlankObject(contactBlankRow, n, values);
  // let contacts = {};
  // for (let i = 0; i < n; i++) {
  //   const id = uuid();
  //   contacts[id] = { ...contactBlankRow, ...values, id };
  // }
  // return contacts;
};

export const getBlankCustomers = (n = 1, values = {}) => {
  return getBlankObject(customerBlankRow, n, values);
  // let customers = {};
  // for (let i = 0; i < n; i++) {
  //   const id = uuid();
  //   customers[id] = { ...customerBlankRow, ...values, id };
  // }
  // return customers;
};
