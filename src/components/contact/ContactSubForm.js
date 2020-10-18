import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import DeleteIcon from "../customIcons/DeleteIcon";
import EditIcon from "../customIcons/EditIcon";

import GridButton from "../customComponents/GridButton";
import GridItem from "../customComponents/GridItem";
import GridInput from "../customComponents/GridInput";
import Input from "../customComponents/Input";

import { contactMethods, contactTypes } from "../../contexts/options";
import { ucFirst } from "../../user_modules/StringManipulation";
import GridSelect from "../customComponents/GridSelect";
import { v4 as uuid } from "uuid";

import { parsePhoneNumberFromString } from "libphonenumber-js";

import rhfProps from "../../user_modules/rhfProps";

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  return !phoneNumber ? value : phoneNumber.formatInternational();
};

const schema = yup.object().shape({
  con_type: yup.string().min(2, "Type is a required field"),
  con_method: yup.string().min(2, "Method is a required field"),
  con_address: yup.string().required("Address is a required field"),
  con_address_phone: yup
    .string()
    .phone("Must be a valid phone number")
    .required("Phone number is a required field"),
  con_address_email: yup
    .string()
    .required("Email address is a required field")
    .email("Must be an email address"),
});

const ContactSubForm = (props) => {
  let contact, contactsState, setContactsState;
  ({
    contact = { con_type: "phone" },
    contactsState,
    setContactsState,
    ...props
  } = props);

  const uF = useForm({
    defaultValues: contact,
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { register, watch, getValues, errors, trigger, setValue } = uF;

  const con_type = watch("con_type");
  const con_address = watch("con_address");

  const editContactFromStateInForm = async (contact) => {
    resetForm(contact);
    await trigger();
    deleteContactFromState(contact.id);
  };

  const addContactToStateFromForm = async ({ id = uuid(), con_cus_id }) => {
    await trigger();
    const valid = Object.keys(errors).length === 0;
    console.log(errors);

    if (valid) {
      // const id = uuid();
      const { con_type, con_method, ...addressValues } = getValues();
      const con_address = addressValues[`con_address_${con_type}`];
      let newContact = { id, con_type, con_method, con_address, con_cus_id };
      setContactsState({ ...contactsState, [id]: newContact });
      resetForm();
    }
  };

  const resetForm = (contact = {}) => {
    const { con_type = "phone", con_method = " ", con_address = "" } = contact;
    setValue("con_type", con_type);
    setValue("con_method", con_method);
    setValue("con_address", con_address);
    setValue("con_address_phone", con_address);
    setValue("con_address_address", con_address);
  };

  const ifEnter = (e, func) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      func();
    }
  };

  const deleteContactFromState = (id) => {
    delete contactsState[id];
    setContactsState({ ...contactsState });
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
          const value = e.target.value;
          const params = { shouldValidate: true };
          setValue(`con_address_${con_type}`, value, params);
          console.log(errors);
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
          label="Phone Number"
          onChange={(e) => {
            e.target.value = normalizePhoneNumber(e.target.value);
            setValue("con_address", e.target.value);
          }}
          defaultValue={con_address}
        />
      )}
      {con_type === "email" && (
        <Input
          style={{ display: "none" }}
          {...addressProps({ name: "con_address_email", register, errors })}
          label="Email Address"
          onChange={(e) => setValue("con_address", e.target.value)}
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

      {Object.values(contactsState).map((contact) => (
        <React.Fragment key={contact.id}>
          <GridItem xs={3}>{contact.con_type}</GridItem>
          <GridItem xs={3}>{contact.con_method}</GridItem>
          <GridItem xs={4}>{contact.con_address}</GridItem>
          <GridItem xs={1} onClick={() => editContactFromStateInForm(contact)}>
            <EditIcon />
          </GridItem>
          <GridItem xs={1} onClick={() => deleteContactFromState(contact.id)}>
            <DeleteIcon />
          </GridItem>
        </React.Fragment>
      ))}
    </>
  );
};

export default ContactSubForm;
