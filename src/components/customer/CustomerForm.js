import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";

import GridButton from "../custom/GridButton";
import MainContainer from "../custom/MainContainer";
import Form from "../custom/Form";
import GridInput from "../custom/GridInput";
import GridContainer from "../custom/GridContainer";
import ContactSubForm from "../contact/ContactSubForm";

import { v4 as uuid } from "uuid";

import useContactReducer from "../../custom_hooks/useContactReducer";
import useCustomerReducer from "../../custom_hooks/useCustomerReducer";

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

const CustomerForm = ({ contacts, ...props }) => {
  contacts = contacts === undefined ? {} : contacts;

  const { addCustomer } = useCustomerReducer();
  const { addContacts } = useContactReducer();

  // setValue,
  // getValues,

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { cus_first_name: "", cus_last_name: "" },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  let [contactsState, setContactsState] = useState(contacts);

  const onSubmit = (data, blah) => {
    const id = uuid();
    const { cus_first_name, cus_last_name } = data;

    addCustomer({ id, cus_first_name, cus_last_name });
    addContacts(contactsState, id);
  };

  return (
    <>
      <MainContainer maxWidth="sm">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <GridContainer>
            <GridInput
              grid={{ xs: 12 }}
              inputRef={register}
              name="cus_first_name"
              label="First Name"
              autoFocus
              error={!!errors.cus_first_name}
              helperText={errors?.cus_first_name?.message}
            />
            <GridInput
              inputRef={register}
              name="cus_last_name"
              label="Last Name"
              error={!!errors.cus_last_name}
              helperText={errors?.cus_last_name?.message}
            />

            <ContactSubForm {...{ contactsState, setContactsState }} />

            <GridButton type="submit">Submit</GridButton>
          </GridContainer>
        </Form>
      </MainContainer>
    </>
  );
};

export default CustomerForm;
