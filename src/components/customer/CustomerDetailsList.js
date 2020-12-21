import React, { useContext, useState } from "react";
import { CustomerContext } from "../../contexts/CustomerContext";
import { ContactsOnCustomerContext } from "../../contexts/ContactsOnCustomerContext";
import CustomerDetails from "./CustomerDetails";
import CustomerForm from "./CustomerForm";

import Modal from "../customComponents/Modal";
// import Modal from "react-modal";

import MainContainer from "../customComponents/MainContainer";

const CustomerList = () => {
  const { customers } = useContext(CustomerContext);
  const { contactsOnCustomers } = useContext(ContactsOnCustomerContext);

  const [modalCustomer, setModalCustomer] = useState(undefined);
  const [modalContacts, setModalContacts] = useState(undefined);

  const onClose = () => setModalCustomer(undefined);

  const modalOpen = modalCustomer !== undefined;

  return (
    <>
      <MainContainer>
        {Object.entries(customers).map(([id, customerRow]) => {
          const contacts = contactsOnCustomers[id];
          return (
            <CustomerDetails
              {...{
                key: id,
                customer: { [id]: customerRow },
                setModalCustomer,
                setModalContacts,
                contacts,
              }}
            />
          );
        })}
      </MainContainer>
      <Modal {...{ open: modalOpen, onClose }}>
        {modalCustomer !== undefined && (
          <CustomerForm
            {...{
              customers: modalCustomer,
              contacts: modalContacts,
              setModalCustomer,
              exists: true,
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default CustomerList;
