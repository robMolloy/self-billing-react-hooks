import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import normalizePhoneNumber from "../../user_modules/normalizePhoneNumber";

// import DeleteIcon from "../customIcons/DeleteIcon";
// import EditIcon from "../customIcons/EditIcon";

import GridItem from "../customComponents/GridItem";
import GridButton from "../customComponents/GridButton";
import GridInput from "../customComponents/GridInput";
import Input from "../customComponents/Input";

import { contactMethods, contactTypes } from "../../contexts/options";
import { ucFirst } from "../../user_modules/StringManipulation";
import GridSelect from "../customComponents/GridSelect";
import { v4 as uuid } from "uuid";

import rhfProps from "../../user_modules/rhfProps";
import ifEnter from "../../user_modules/ifEnter";

import ContactSchema from "./ContactSchema";

const ContactSubForm = (props) => {
  let contact, contactsState, setContactsState, defaultValues, mode, resolver;

  ({
    defaultValues = { con_type: "phone", con_method: " ", con_address: "" },
    mode = "onChange",
    resolver = yupResolver(ContactSchema),
    contact = {},
    contactsState,
    setContactsState,
    ...props
  } = props);

  const uF = useForm({ defaultValues, mode, resolver });

  const { register, watch, getValues, errors, trigger, setValue } = uF;

  const con_type = watch("con_type");
  const con_address = watch("con_address");

  const addContactToStateFromForm = async ({ id = uuid(), con_cus_id }) => {
    await trigger();
    const valid = Object.keys(errors).length === 0;

    if (valid) {
      // const id = uuid();
      const { con_type, con_method, ...addressValues } = getValues();
      const con_address = addressValues[`con_address_${con_type}`];
      let newContact = { id, con_type, con_method, con_address, con_cus_id };
      setContactsState({ ...contactsState, [id]: newContact });
      resetForm();
    }
  };

  const resetForm = (contact = defaultValues) => {
    const { con_type = "phone", con_method = " ", con_address = "" } = contact;
    setValue("con_type", con_type);
    setValue("con_method", con_method);
    setValue("con_address", con_address);
    setValue("con_address_phone", con_address);
    setValue("con_address_address", con_address);
  };

  const addressProps = ({ register, name, errors }) => {
    return {
      grid: { xs: 10, sm: 4 },
      onKeyDown: (e) => ifEnter(e, addContactToStateFromForm),
      ...rhfProps({ name, register, errors }),
    };
  };

  const conTypeMethods =
    contactMethods[con_type] === undefined ? [] : contactMethods[con_type];

  return (
    <>
      <GridItem>Contacts</GridItem>
      <GridSelect
        grid={{ xs: 6, sm: 3 }}
        label="Type"
        {...rhfProps({ name: "con_type", register, errors })}
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
      >
        {conTypeMethods.map((value) => (
          <option {...{ key: value, value }}>{ucFirst(value)}</option>
        ))}
      </GridSelect>
      <GridInput
        grid={{ xs: 10, sm: 4 }}
        onChange={(e) => {
          const params = { shouldValidate: true };

          if (con_type === "phone") {
            e.target.value = normalizePhoneNumber(e.target.value);
          }
          setValue(`con_address_${con_type}`, e.target.value, params);
        }}
        onKeyDown={(e) =>
          ifEnter(e, addContactToStateFromForm.bind(this, contact))
        }
        name="con_address"
        label={ucFirst(con_type)}
        inputRef={register}
        error={!!errors[`con_address_${con_type}`]}
        helperText={errors?.[`con_address_${con_type}`]?.message}
      />

      {con_type === "phone" && (
        <Input
          style={{ display: "none" }}
          {...addressProps({ name: "con_address_phone", register, errors })}
          defaultValue={con_address}
        />
      )}
      {con_type === "email" && (
        <Input
          style={{ display: "none" }}
          {...addressProps({ name: "con_address_email", register, errors })}
          defaultValue={con_address}
        />
      )}

      <GridButton
        grid={{ xs: 2 }}
        variant="outlined"
        onClick={() => addContactToStateFromForm(contact)}
      >
        +
      </GridButton>
    </>
  );
};

export default ContactSubForm;
