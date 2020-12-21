import React from "react";
import CustomerDisplayLine from "./CustomerDisplayLine";
import { v4 as uuid } from "uuid";

const CustomerDisplayLineList = ({ customers }) => {
  return Object.entries(customers).map(([id, customerRow]) => (
    <CustomerDisplayLine key={uuid()} customer={{ [id]: customerRow }} />
  ));
};

export default CustomerDisplayLineList;
