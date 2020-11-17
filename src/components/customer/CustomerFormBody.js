// from custom hooks deconstruct functions
// const { addCustomer } = useCustomerContext();
// const { addContacts } = useContactContext();

import React from "react";
import useForm from "../../custom_hooks/useRHForm";

import GridInput from "../customComponents/GridInput";
import { customerBlankRow } from "../../object_info/blankRows";

import Schema from "./CustomerSchema";

const CustomerForm = (props) => {
  let values, formState, setFormState;
  ({ values, formState, setFormState, ...props } = props);

  const exists = !!values;
  values = exists ? values : customerBlankRow;

  React.useEffect(() => {
    console.log("render customer form - when new object is used to set state");

    Object.assign(formState, { values, ...form });
    setFormState(formState);
  });

  // give form default values and behaviour
  const form = useForm({ defaultValues: customerBlankRow, Schema });

  const changeFieldState = (name, value) => {
    formState.values[name] = value;
    setFormState(formState);
  };

  return (
    <>
      <GridInput
        autoFocus
        label="First Name"
        {...form.fieldProps("cus_first_name")}
        onChange={(e) => changeFieldState("cus_first_name", e.target.value)}
      />

      <GridInput
        label="Last Name"
        {...form.fieldProps("cus_last_name")}
        onChange={(e) => changeFieldState("cus_last_name", e.target.value)}
      />
    </>
  );
};

export default CustomerForm;
