import {
  contactBlankRow,
  customerBlankRow,
  prjCusLinkBlankRow,
  projectBlankRow,
  recItemBlankRow,
  recordBlankRow,
} from "./blankRows";
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

export const getBlankPrjCusLinks = (n = 1, values = {}) => {
  return getBlankObject(prjCusLinkBlankRow, n, values);
};

export const getBlankProjects = (n = 1, values = {}) => {
  return getBlankObject(projectBlankRow, n, values);
};

export const getBlankRecItem = (n = 1, values = {}) => {
  return getBlankObject(recItemBlankRow, n, values);
};

export const getBlankRecords = (n = 1, values = {}) => {
  return getBlankObject(recordBlankRow, n, values);
};
