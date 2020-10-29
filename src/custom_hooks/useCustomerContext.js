import { useContext } from "react";
import { CustomerContext } from "../contexts/CustomerContext";
import { ContactsOnCustomerContext } from "../contexts/ContactsOnCustomerContext";
import useContactContext from "./useContactContext";
import Swal from "sweetalert2";

const useCustomerContext = (id) => {
  const customerContextReturn = useContext(CustomerContext);
  const { dispatch } = customerContextReturn;

  const contactsOnCustomerContextReturn = useContext(ContactsOnCustomerContext);
  const { contactsOnCustomers } = contactsOnCustomerContextReturn;

  const { removeContact } = useContactContext();

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

  return {
    ...customerContextReturn,
    removeCustomer,
    removeCustomerDialogue,
    addCustomer,
  };
};

export default useCustomerContext;
