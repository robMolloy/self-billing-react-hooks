import React, { useContext } from "react";
import { CustomerContext } from "../../contexts/CustomerContext";
import { ContactContext } from "../../contexts/ContactContext";
import { ContactsOnCustomerContext } from "../../contexts/ContactsOnCustomerContext";

const CustomerDetails = ({ customer, customerContacts }) => {
  const { dispatch: dispatchCustomer } = useContext(CustomerContext);
  const { dispatch: dispatchContact } = useContext(ContactContext);
  const { contactsOnCustomers } = useContext(ContactsOnCustomerContext);

  const removeCustomer = (id) => {
    const customerContacts = contactsOnCustomers[id];
    customerContacts.forEach((contact) => {
      dispatchContact({ type: "REMOVE_CONTACT", id: contact.id });
    });
    dispatchCustomer({ type: "REMOVE_CUSTOMER", id });
  };

  return (
    <div className="panel" onClick={() => removeCustomer(customer.id)}>
      <div className="jc">
        {customer.cus_first_name} {customer.cus_last_name}
      </div>

      {customerContacts.map((contact) => (
        <div key={contact.id}>
          <div>
            {contact.con_type}{" "}
            {contact.con_type === "phone" ? `(${contact.con_method})` : ""}
          </div>
          <div className="jr flex1">{contact.con_address}</div>
        </div>
      ))}
    </div>
  );
};

export default CustomerDetails;
