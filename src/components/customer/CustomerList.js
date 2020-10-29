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

  const customerArray = Object.values(customers);
  // console.log(customerArray);

  const [modalCustomer, setModalCustomer] = useState(undefined);
  const [modalContacts, setModalContacts] = useState(undefined);

  const onClose = () => setModalCustomer(undefined);

  const modalOpen = modalCustomer !== undefined;

  return (
    <>
      <MainContainer>
        {customerArray.map((customer) => {
          const key = customer.id;
          const customerContacts = contactsOnCustomers[customer.id];
          return (
            <CustomerDetails
              {...{
                key,
                customer,
                setModalCustomer,
                setModalContacts,
                customerContacts,
              }}
            />
          );
        })}
      </MainContainer>
      <Modal {...{ open: modalOpen, onClose }}>
        <CustomerForm
          {...{
            defaultValues: modalCustomer,
            contacts: modalContacts,
            setModalCustomer,
          }}
        />
      </Modal>
    </>
  );
};

export default CustomerList;
