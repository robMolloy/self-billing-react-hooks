import React from "react";
// import phone from "../../user_modules/normalizePhoneNumber";

import GridInput from "../customComponents/GridInput";
// import GridItem from "../customComponents/GridItem";
// import Input from "../customComponents/Input";

// import { contactMethods, contactTypes } from "../../contexts/options";
// import { ucFirst } from "../../user_modules/StringManipulation";
// import GridSelect from "../customComponents/GridSelect";
// import Option from "../customComponents/Option";

// import DeleteIcon from "../customIcons/DeleteIcon";
import Schema from "./CustomerSchema";
import { customerBlankRow } from "../../object_info/blankRows";

// import rhfListItemObject from "  ../../user_modules/rhfListItemObject";
import useForm from "../../custom_hooks/useRHForm";

const CustomerFormListItem = (props) => {
  let values, state, setState;
  ({ values = customerBlankRow, state, setState } = props);

  const id = values.id;

  React.useEffect(() => {
    state.customers = state?.customers ?? {};

    let controls = state?.customers?.controls ?? {};
    let stateValues = state?.customers?.values ?? {};

    state.customers.values = { ...stateValues, [id]: values };
    state.customers.controls = { ...controls, [id]: form };

    setState(state);
    //eslint-disable-next-line
  }, []);

  const form = useForm({ defaultValues: values, Schema });

  const setStateValue = (name, value) => {
    state.customers.values[id][name] = value;
    setState(state);
  };

  const setFieldValue = (name, value, params = { shouldValidate: true }) => {
    state.customers.controls[id].setValue(name, value, params);
    setStateValue(name, value);
  };

  return (
    <>
      <GridInput
        autoFocus
        label="First Name"
        {...form.fieldProps("cus_first_name")}
        onChange={(e) => setFieldValue("cus_first_name", e.target.value)}
      />

      <GridInput
        label="Last Name"
        {...form.fieldProps("cus_last_name")}
        onChange={(e) => setFieldValue("cus_last_name", e.target.value)}
      />
    </>
  );
};

export default CustomerFormListItem;
