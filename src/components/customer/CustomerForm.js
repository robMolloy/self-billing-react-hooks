import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// import DeleteIcon from "../customIcons/DeleteIcon";
// import EditIcon from "../customIcons/EditIcon";

import GridItem from "../customComponents/GridItem";

import GridButton from "../customComponents/GridButton";
import MainContainer from "../customComponents/MainContainer";
import Form from "../customComponents/Form";
import GridInput from "../customComponents/GridInput";
import GridContainer from "../customComponents/GridContainer";
import ContactSubForm from "../contact/ContactSubForm";
import { getBlankContacts } from "../../object_info/blankObjects";

import { v4 as uuid } from "uuid";

import useContactContext from "../../custom_hooks/useContactContext";
import useCustomerContext from "../../custom_hooks/useCustomerContext";

import rhfProps from "../../user_modules/rhfProps";

import CustomerSchema from "./CustomerSchema";

const CustomerForm = (props) => {
  let exists, contacts, setModalCustomer, defaultValues;

  ({
    exists = false,
    defaultValues = {},
    contacts = getBlankContacts(1),
    setModalCustomer,
    ...props
  } = props);

  const { id = uuid() } = defaultValues;

  const { addCustomer } = useCustomerContext();
  const { addContacts } = useContactContext();

  const useCustomerForm = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(CustomerSchema),
  });
  const { register, handleSubmit, errors, reset } = useCustomerForm;

  let [contactsState, setContactsState] = useState(contacts);

  // console.log(contacts);

  let oContactFormsState = {};
  Object.values(contacts).forEach((contact) => {
    oContactFormsState[contact.id] = { defaultValues: contact };
  });

  let [contactFormsState, setContactFormsState] = useState(oContactFormsState);

  const onSubmit = (data, e) => {
    const { cus_first_name, cus_last_name } = data;

    addCustomer({ id, cus_first_name, cus_last_name });
    addContacts(contactsState, id);

    if (exists) {
      setModalCustomer(undefined);
    } else {
      reset();
    }

    setContactsState({});
  };

  // const editContactFromStateInForm = async (contact) => {
  //   // resetForm(contact);
  //   // await trigger();
  //   deleteContactFromState(contact.id);
  // };

  // const deleteContactFromState = (id) => {
  //   delete contactsState[id];
  //   setContactsState({ ...contactsState });
  // };

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <GridContainer>
          <GridInput
            autoFocus
            label="First Name"
            {...rhfProps({ name: "cus_first_name", register, errors })}
          />
          <GridInput
            label="Last Name"
            {...rhfProps({ name: "cus_last_name", register, errors })}
          />

          <GridItem alignItems="center" xs={6}>
            Add Contact
          </GridItem>
          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => {
              let newContactsState = {
                ...contactsState,
                ...getBlankContacts(1, {
                  con_type: "phone",
                  con_method: "whatsapp",
                }),
              };
              console.log(newContactsState);
              setContactsState(newContactsState);
            }}
          >
            +
          </GridButton>
          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => {
              console.log(contactFormsState);
            }}
          >
            log
          </GridButton>
          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => {
              Object.values(contactFormsState).forEach((value) => {
                value.trigger();
              });
              let id = Object.keys(contactFormsState)[0];
              contactFormsState[id].trigger();
            }}
          >
            trigger
          </GridButton>

          {Object.values(contactsState).map((defaultValues) => {
            return (
              <ContactSubForm
                {...{
                  key: uuid(),
                  contactsState,
                  setContactsState,
                  contactFormsState,
                  setContactFormsState,
                  defaultValues,
                }}
              />
            );
          })}

          <GridButton type="submit">Submit</GridButton>
        </GridContainer>
      </Form>
    </MainContainer>
  );
};

export default CustomerForm;
