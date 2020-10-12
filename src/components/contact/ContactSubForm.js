import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import "yup-phone";

import GridButton from "../custom/GridButton";
import GridItem from "../custom/GridItem";
import GridInput from "../custom/GridInput";

import { contactMethods, contactTypes } from "../../contexts/options";
import { ucFirst } from "../../user_modules/StringManipulation";
import GridSelect from "../custom/GridSelect";
import { v4 as uuid } from "uuid";

import { parsePhoneNumberFromString } from "libphonenumber-js";

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  return !phoneNumber ? value : phoneNumber.formatInternational();
};

const schema = yup.object().shape({
  con_type: yup.string().required("Type is a required field"),
  con_method: yup.string().required("Method is a required field"),
  con_address: yup.string().required("Address is a required field"),
  con_address_phone: yup
    .string()
    .phone()
    .required("Phone number is a required field"),
  con_address_email: yup
    .string()
    .required("Email address is a required field")
    .email("must be an email address"),
});

const CustomerForm = ({ contacts, contactsState, setContactsState }) => {
  const { register, watch, getValues, errors, trigger, reset } = useForm({
    defaultValues: { con_type: "", con_method: "", con_address: "" },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const con_type = watch("con_type");

  return (
    <>
      <GridItem>Contacts</GridItem>
      <GridSelect
        autoFocus
        grid={{ xs: 6, sm: 3 }}
        inputRef={register}
        defaultValue=""
        name="con_type"
        label="Type"
        error={!!errors.con_type}
      >
        <option disabled value={""}></option>
        {contactTypes.map((contactType) => (
          <option key={contactType} value={contactType}>
            {ucFirst(contactType)}
          </option>
        ))}
      </GridSelect>
      <GridSelect
        grid={{ xs: 6, sm: 3 }}
        inputRef={register}
        name="con_method"
        defaultValue=""
        label="Method"
        error={!!errors.con_method}
      >
        <option disabled value={""}></option>
        {(contactMethods[con_type] ? contactMethods[con_type] : []).map(
          (contactMethod) => (
            <option key={contactMethod} value={contactMethod}>
              {ucFirst(contactMethod)}
            </option>
          )
        )}
      </GridSelect>
      {con_type === "" && (
        <GridInput
          grid={{ xs: 9, sm: 4 }}
          inputRef={register}
          name="con_address"
          label="Address"
          error={!!errors.con_address}
          helperText={errors?.con_address?.message}
        />
      )}
      {con_type === "phone" && (
        <GridInput
          grid={{ xs: 9, sm: 4 }}
          inputRef={register}
          name="con_address_phone"
          onChange={(e) => {
            e.target.value = normalizePhoneNumber(e.target.value);
          }}
          label="Phone Number"
          error={!!errors.con_address_phone}
          helperText={errors?.con_address_phone?.message}
        />
      )}
      {con_type === "email" && (
        <GridInput
          grid={{ xs: 9, sm: 4 }}
          inputRef={register}
          name="con_address_email"
          label="Email Address"
          error={!!errors.con_address_email}
          helperText={errors?.con_address_email?.message}
        />
      )}

      <GridButton
        grid={{ xs: 2 }}
        variant="outlined"
        onClick={async () => {
          await trigger();
          const errorKeys = Object.keys(errors);
          const valid = errorKeys.length === 0;

          if (valid) {
            const { con_type, con_method, ...addressProps } = getValues();
            const con_address = Object.values(addressProps).filter(Boolean);
            let newContact = { con_type, con_method, con_address };
            setContactsState({ ...contactsState, [uuid()]: newContact });

            reset();
          }

          // const inputFocus = errorKeys[0] ? errorKeys[0] : "con_type";
          // console.log(inputFocus);

          // document.querySelector(`[name = "${inputFocus}"]`).focus();
        }}
      >
        +
      </GridButton>

      {Object.values(contactsState).map((contact) => (
        <React.Fragment key={uuid()}>
          <GridItem xs={3}>{contact.con_type}</GridItem>
          <GridItem xs={3}>{contact.con_method}</GridItem>
          <GridItem xs={4}>{contact.con_address}</GridItem>
          <GridItem xs={2}></GridItem>
        </React.Fragment>
      ))}
    </>
  );
};

export default CustomerForm;
