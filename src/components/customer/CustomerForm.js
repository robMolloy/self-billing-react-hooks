import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";

import GridButton from "../customComponents/GridButton";
import MainContainer from "../customComponents/MainContainer";
import Form from "../customComponents/Form";
import GridInput from "../customComponents/GridInput";
import GridContainer from "../customComponents/GridContainer";
import ContactSubForm from "../contact/ContactSubForm";

import { v4 as uuid } from "uuid";

import useContactReducer from "../../custom_hooks/useContactReducer";
import useCustomerReducer from "../../custom_hooks/useCustomerReducer";

import rhfProps from "../../user_modules/rhfProps";

const schema = yup.object().shape({
  cus_first_name: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
  cus_last_name: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
});

const CustomerForm = ({ contacts = {}, customer = {}, ...props }) => {
  const { addCustomer } = useCustomerReducer();
  const { addContacts } = useContactReducer();

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: customer,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  let [contactsState, setContactsState] = useState(contacts);

  const onSubmit = (data, e) => {
    const id = uuid();
    const { cus_first_name, cus_last_name } = data;

    addCustomer({ id, cus_first_name, cus_last_name });
    addContacts(contactsState, id);

    reset();

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

          <ContactSubForm {...{ contactsState, setContactsState }} />

          <GridButton type="submit">Submit</GridButton>
        </GridContainer>
      </Form>
    </MainContainer>
  );
};

export default CustomerForm;
