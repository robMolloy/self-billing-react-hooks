import { useContext } from "react";
import { CustomerContext } from "../contexts/CustomerContext";
import { ContactsOnCustomerContext } from "../contexts/ContactsOnCustomerContext";
import useContactReducer from "../custom_hooks/useContactReducer";
import Swal from "sweetalert2";

const useCustomerReducer = (id) => {
  const { dispatch } = useContext(CustomerContext);
  // const { dispatch: dispatchContact } = useContext(ContactContext);
  const { contactsOnCustomers } = useContext(ContactsOnCustomerContext);
  // const { addContact } = useContactReducer();

  const { removeContact } = useContactReducer();

  const removeCustomer = (id) => {
    const contacts = contactsOnCustomers[id];

    Object.values(contacts).forEach((contact) => removeContact(contact.id));
    dispatch({ type: "REMOVE_CUSTOMER", id });
  };

  const removeCustomerDialogue = async (id) => {
    const swalRtn = await Swal.fire({
      icon: "question",
      title: "Do you want to delete?",
      target: "body",
      showCancelButton: true,
      confirmButtonText: `Delete`,
    });
    if (swalRtn.isConfirmed) {
      removeCustomer(id);
      Swal.fire("Deleted!", "", "success");
    }
  };

  const addCustomer = (customer) => {
    dispatch({ type: "ADD_CUSTOMER", customer });
  };

  return { removeCustomer, removeCustomerDialogue, addCustomer };
};

export default useCustomerReducer;
