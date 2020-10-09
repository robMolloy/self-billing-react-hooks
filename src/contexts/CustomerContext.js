import React, { createContext, useReducer, useEffect } from "react";
import { CustomerReducer } from "../reducers/CustomerReducer";
import mightyStorage from "../user_modules/mightyStorage";

export const CustomerContext = createContext();

const CustomerContextProvider = (props) => {
  const [customers, dispatch] = useReducer(
    CustomerReducer,
    mightyStorage.getItem("sb_customers", {})
  );

  useEffect(() => {
    mightyStorage.setItem("sb_customers", customers);
  }, [customers]);

  return (
    <CustomerContext.Provider value={{ customers, dispatch }}>
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;
