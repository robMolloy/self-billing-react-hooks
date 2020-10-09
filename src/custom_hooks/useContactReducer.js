import { useContext } from "react";
import { ContactContext } from "../contexts/ContactContext";

const useContactReducer = (id) => {
  const { dispatch } = useContext(ContactContext);

  const removeContact = (id) => dispatch({ type: "REMOVE_CONTACT", id });
  const addContact = (contact) => dispatch({ type: "ADD_CONTACT", contact });

  return { removeContact, addContact };
};

export default useContactReducer;
