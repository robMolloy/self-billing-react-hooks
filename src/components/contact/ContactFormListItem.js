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

import rhfListItemObject from "../../user_modules/rhfListItemObject";
import useForm from "../../custom_hooks/useRHForm";

const ContactSubForm = (props) => {
  let values, formListState, setFormListState;
  ({ values = contactBlankRow, formListState, setFormListState } = props);

  const id = values.id;

  const form = useForm({
    defaultValues: { ...values },
    Schema,
  });

  const con_type = form.watch("con_type");
  const con_address = form.watch("con_address");

  React.useEffect(() => {
    Object.assign(formListState[id], form);
    setFormListState(formListState);
  });

  const listItem = new rhfListItemObject({
    id,
    formListState,
    setFormListState,
    defaultValues: contactBlankRow,
  });

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
        grid={{ xs: 6, sm: 3 }}
        label="Type"
        {...form.fieldProps("con_type")}
        onChange={(e) => listItem.setState("con_type", e.target.value)}
        option1=""
        defaultValue={"email"}
      >
        {conTypeOptions}
      </GridSelect>

      <GridSelect
        grid={{ xs: 6, sm: 3 }}
        label="Method"
        {...form.fieldProps("con_method")}
        onChange={(e) => listItem.setState("con_method", e.target.value)}
        defaultValue={"email"}
      >
        {conMethodOptions}
      </GridSelect>
      <GridInput
        grid={{ xs: 10, sm: 4 }}
        onChange={(e) => {
          if (con_type === "phone") e.target.value = phone(e.target.value);
          listItem.setState("con_address", e.target.value);
          listItem.setValue(`con_address_${con_type}`, e.target.value);
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
        onClick={() => listItem.remove()}
      >
        <DeleteIcon />
      </GridItem>
    </>
  );
};

export default ContactSubForm;
