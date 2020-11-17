import React from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import phone from "../../user_modules/normalizePhoneNumber";

// import DeleteIcon from "../customIcons/DeleteIcon";
// import EditIcon from "../customIcons/EditIcon";
// import GridButton from "../customComponents/GridButton";

import GridItem from "../customComponents/GridItem";
import GridInput from "../customComponents/GridInput";
import Input from "../customComponents/Input";

// import { v4 as uuid } from "uuid";
import { contactMethods, contactTypes } from "../../contexts/options";
import { ucFirst } from "../../user_modules/StringManipulation";
import GridSelect from "../customComponents/GridSelect";

import rhfProps from "../../user_modules/rhfProps";
// import ifEnter from "../../user_modules/ifEnter";

import Schema from "./ContactSchema";
import DeleteIcon from "../customIcons/DeleteIcon";
import formProps from "../../user_modules/rhfFormProps";
import { contactBlankRow } from "../../object_info/blankRows";

import rhfListItemObject from "../../user_modules/rhfListItemObject";

const ContactSubForm = (props) => {
  let values, formListState, setFormListState;
  ({ values, formListState, setFormListState } = props);

  const id = values.id;

  const form = useForm(
    formProps({ defaultValues: { ...values, con_type: "phone" }, Schema })
  );
  let { register, errors } = form;

  const con_type = form.watch("con_type");
  const con_address = form.watch("con_address");

  React.useEffect(() => {
    formListState[id] = { ...formListState[id], ...form };
    setFormListState(formListState);
  });

  const listItem = new rhfListItemObject({
    id,
    formListState,
    setFormListState,
    defaultValues: contactBlankRow,
  });

  // const getErrors = async () => {
  //   await trigger();
  //   const valid = Object.keys(errors).length === 0;
  // };

  // const resetForm = (contact = values) => {
  //   const { con_type = "phone", con_method = " ", con_address = "" } = contact;

  //   form.setValue("con_type", con_type);
  //   form.setValue("con_method", con_method);
  //   form.setValue("con_address", con_address);
  //   form.setValue("con_address_phone", con_address);
  //   form.setValue("con_address_address", con_address);
  // };

  // const addContactToStateFromForm = async ({ id = uuid(), con_cus_id }) => {
  //   await form.trigger();
  //   const valid = Object.keys(errors).length === 0;

  //   if (valid) {
  //     const { con_type, con_method, ...addressValues } = form.getValues();
  //     const con_address = addressValues[`con_address_${con_type}`];
  //     let newContact = { id, con_type, con_method, con_address, con_cus_id };
  //     setListState({ ...listState, [id]: newContact });
  //     resetForm();
  //   }
  // };

  // const addressProps = ({ register, name, errors }) => {
  //   return {
  //     grid: { xs: 10, sm: 4 },
  //     // onKeyDown: (e) => ifEnter(e, addContactToStateFromForm),
  //     ...rhfProps({ name, register, errors }),
  //   };
  // };

  const { [con_type]: conTypeMethods = [] } = contactMethods;

  return (
    <>
      <GridSelect
        grid={{ xs: 6, sm: 3 }}
        label="Type"
        {...rhfProps({ name: "con_type", register, errors })}
        onChange={(e) => listItem.setState("con_type", e.target.value)}
        option1=""
      >
        {contactTypes.map((value) => (
          <option {...{ key: value, value }}>{ucFirst(value)}</option>
        ))}
      </GridSelect>
      <GridSelect
        grid={{ xs: 6, sm: 3 }}
        label="Method"
        {...rhfProps({ name: "con_method", register, errors })}
        onChange={(e) => listItem.setState("con_method", e.target.value)}
        onBlur={(e) => console.log(123)}
      >
        {conTypeMethods.map((value) => (
          <option {...{ key: value, value }}>{ucFirst(value)}</option>
        ))}
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
        inputRef={register}
        error={!!errors[`con_address_${con_type}`]}
        helperText={errors?.[`con_address_${con_type}`]?.message}
      />

      {con_type === "phone" && (
        <Input
          style={{ display: "none" }}
          {...rhfProps({ name: "con_address_phone", register, errors })}
          defaultValue={con_address}
        />
      )}

      {con_type === "email" && (
        <Input
          style={{ display: "none" }}
          {...rhfProps({ name: "con_address_email", register, errors })}
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
