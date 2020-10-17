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
  const { register, watch, getValues, errors, trigger, setValue, reset } = uF;

  const con_type = watch("con_type");
  const con_address = watch("con_address");

  const editContactFromStateInForm = async (id) => {
    const contact = contactsState[id];
    reset();
    deleteContactFromState(contact.id);
  };

  const addContactToStateFromForm = async () => {
    await trigger();
    const valid = Object.keys(errors).length === 0;

    if (valid) {
      const id = uuid();
      const { con_type, con_method, ...addressValues } = getValues();
      const con_address = addressValues[`con_address_${con_type}`];
      let newContact = { id, con_type, con_method, con_address };
      setContactsState({ ...contactsState, [id]: newContact });
      resetForm();
    }
  };

  const resetForm = () => {
    setValue("con_type", "phone");
    setValue("con_method", " ");
    setValue("con_address", "");
    setValue("con_address_phone", "");
    setValue("con_address_address", "");
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
        {(contactMethods[con_type] ? contactMethods[con_type] : []).map(
          (value) => (
            <option {...{ key: value, value }}>{ucFirst(value)}</option>
          )
        )}
      </GridSelect>
      <Input
        {...addressProps({ name: "con_address", register, errors })}
        style={{ display: "none" }}
        label="Address"
      />

      {con_type === "phone" && (
        <GridInput
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
        <GridInput
          {...addressProps({ name: "con_address_email", register, errors })}
          label="Email Address"
          onChange={(e) => setValue("con_address", e.target.value)}
          defaultValue={con_address}
        />
      )}

      <GridButton
        grid={{ xs: 2 }}
        variant="outlined"
        onClick={() => addContactToStateFromForm()}
      >
        +
      </GridButton>

      {Object.values(contactsState).map((contact) => (
        <React.Fragment key={contact.id}>
          <GridItem xs={3}>{contact.con_type}</GridItem>
          <GridItem xs={3}>{contact.con_method}</GridItem>
          <GridItem xs={4}>{contact.con_address}</GridItem>
          <GridItem
            xs={1}
            onClick={() => editContactFromStateInForm(contact.id)}
          >
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
