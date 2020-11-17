import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
  // declare variables
  let exists, contacts, setModalCustomer, defaultValues;

  // deconstruct props, to give variables value
  ({
    exists = false,
    defaultValues = {},
    contacts = getBlankContacts(1),
    setModalCustomer,
    ...props
  } = props);

  // id from defaultValues
  const { id = uuid() } = defaultValues;

  // from custom hooks deconstruct functions
  const { addCustomer } = useCustomerContext();
  const { addContacts } = useContactContext();

  // give form default values and behaviour
  const useCustomerForm = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(CustomerSchema),
  });

  // deconstruct form functions
  const { register, handleSubmit, errors, reset } = useCustomerForm;

  // set state for contact and contactForm
  let [contactsState, setContactsState] = useState(contacts);
  let [contactFormsState, setContactFormsState] = useState({});

  // add contact to state with random id
  const addContactToState = () => {
    let newContact = getBlankContacts(1, {
      con_type: "phone",
      con_method: "whatsapp",
    });
    let newContacts = { ...contactsState, ...newContact };
    setContactsState(newContacts);
    return newContact.id;
  };

  // trigger errors on contact form
  const triggerErrorsOnContactForm = () => {
    Object.values(contactFormsState).forEach((value) => {
      value.trigger();
    });
  };

  // behaviour on submit
  const onSubmit = (data, e) => {
    const { cus_first_name, cus_last_name } = data;

    addCustomer({ id, cus_first_name, cus_last_name });
    addContacts(contactsState, id);

    if (exists) setModalCustomer(undefined);
    else reset();

    setContactsState({});
  };

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

          <GridItem
            //  alignItems="center"
            xs={3}
          >
            Add Contact
          </GridItem>

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => addContactToState()}
          >
            +
          </GridButton>

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => console.log(contactsState)}
          >
            log
          </GridButton>

          <GridButton
            grid={{ xs: 3 }}
            variant="outlined"
            onClick={() => console.log(contactFormsState)}
          >
            log Form
          </GridButton>

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => triggerErrorsOnContactForm()}
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