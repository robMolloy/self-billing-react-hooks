import React from "react";
import phone from "../../user_modules/normalizePhoneNumber";

import GridItem from "../customComponents/GridItem";
import GridInput from "../customComponents/GridInput";
import Input from "../customComponents/Input";

import { contactMethods, contactTypes } from "../../contexts/options";
import { ucFirst } from "../../user_modules/StringManipulation";
import GridSelect from "../customComponents/GridSelect";
import Option from "../customComponents/Option";

import Schema from "./ContactSchema";
import DeleteIcon from "../customIcons/DeleteIcon";
import { contactBlankRow } from "../../object_info/blankRows";

// import rhfListItemObject from "  ../../user_modules/rhfListItemObject";
import useForm from "../../custom_hooks/useRHForm";

const ContactSubForm = (props) => {
  let values, state, setState;
  ({ values = contactBlankRow, state, setState } = props);

  const id = values.id;

  React.useEffect(() => {
    state.contacts = state?.contacts ?? {};

    let controls = state?.contacts?.controls ?? {};
    let stateValues = state?.contacts?.values ?? {};

    state.contacts.values = { ...stateValues, [id]: values };
    state.contacts.controls = { ...controls, [id]: form };

    setState(state);
    //eslint-disable-next-line
  }, []);

  const form = useForm({ defaultValues: values, Schema });

  const con_type = form.watch("con_type");
  const con_address = form.watch("con_address");

  const removeItem = () => {
    delete state.contacts.values[id];
    delete state.contacts.controls[id];
    setState({ ...state });
  };

  const setStateValue = (name, value) => {
    state.contacts.values[id][name] = value;
    setState(state);
  };

  const setFieldValue = (name, value, params = { shouldValidate: true }) => {
    state.contacts.controls[id].setValue(name, value, params);
    setStateValue(name, value);
  };

  const { [con_type]: conMethods = [] } = contactMethods;

  const conTypeOptions = contactTypes.map((value) => (
    <Option {...{ key: value, value }}>{ucFirst(value)}</Option>
  ));
  const conMethodOptions = conMethods.map((value) => (
    <Option {...{ key: value, value }}>{ucFirst(value)}</Option>
  ));

  return (
    <>
      <GridSelect
        autoFocus
        grid={{ xs: 6, sm: 3 }}
        label="Type"
        {...form.fieldProps("con_type")}
        onChange={(e) => setStateValue("con_type", e.target.value)}
        option1=""
      >
        {conTypeOptions}
      </GridSelect>

      <GridSelect
        grid={{ xs: 6, sm: 3 }}
        label="Method"
        {...form.fieldProps("con_method")}
        onChange={(e) => setStateValue("con_method", e.target.value)}
      >
        {conMethodOptions}
      </GridSelect>
      <GridInput
        grid={{ xs: 10, sm: 4 }}
        onChange={(e) => {
          if (con_type === "phone") e.target.value = phone(e.target.value);

          setStateValue("con_address", e.target.value);
          setFieldValue(`con_address_${con_type}`, e.target.value);
        }}
        name="con_address"
        label={ucFirst(con_type)}
        inputRef={form.register}
        error={!!form.errors[`con_address_${con_type}`]}
        helperText={form.errors?.[`con_address_${con_type}`]?.message}
      />

      {con_type === "phone" && (
        <Input
          style={{ display: "none" }}
          {...form.fieldProps("con_address_phone")}
          defaultValue={con_address}
        />
      )}

      {con_type === "email" && (
        <Input
          style={{ display: "none" }}
          {...form.fieldProps("con_address_email")}
          defaultValue={con_address}
        />
      )}

      <GridItem
        xs={2}
        // justify="center"
        // alignItems="center"
        onClick={() => removeItem()}
      >
        <DeleteIcon />
      </GridItem>
    </>
  );
};

export default ContactSubForm;
