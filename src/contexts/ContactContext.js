import React, { createContext, useReducer, useEffect } from "react";
import { ContactReducer } from "../reducers/ContactReducer";
import mightyStorage from "../user_modules/mightyStorage";

export const ContactContext = createContext();

const ContactContextProvider = (props) => {
  const [contacts, dispatch] = useReducer(
    ContactReducer,
    mightyStorage.getItem("sb_contacts", {})
  );

  useEffect(() => {
    mightyStorage.setItem("sb_contacts", contacts);
  }, [contacts]);

  return (
    <ContactContext.Provider value={{ contacts, dispatch }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;
