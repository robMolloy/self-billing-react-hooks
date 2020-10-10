// import React, { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { contactMethods, contactTypes } from "../../contexts/options";
import { ucFirst } from "../../user_modules/StringManipulation";
import GridInput from "../custom/GridInput";
import GridSelect from "../custom/GridSelect";
import GridContainer from "../custom/GridContainer";

import { contactBlankRow } from "../../object_info/blankRows";

const schema = yup.object().shape({
  con_name: yup.string().required("Contact name is a required field"),
  con_address: yup.string().required("Contact address is a required field"),
});

const ContactSubForm = ({ contact, ...props }) => {
  // const { register, watch, handleSubmit, errors } = useForm({
  const { register, watch } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const con_type = watch("con_type");

  contact = contact === undefined ? contactBlankRow : contact;

  return (
    <GridContainer>
      <GridSelect
        grid={{ xs: 6 }}
        inputRef={register}
        defaultValue={contact.con_type}
        name="con_type"
        label="Type"
        required
      >
        <option disabled value={""}></option>
        {contactTypes.map((contactType) => (
          <option key={contactType} value={contactType}>
            {ucFirst(contactType)}
          </option>
        ))}
      </GridSelect>

      <GridSelect
        grid={{ xs: 6 }}
        name="con_method"
        defaultValue={contact.con_method}
        label="Method"
        required
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

      <GridInput
        grid={{ xs: 12 }}
        ref={register}
        defaultValue={contact.con_address}
        name="con_address"
        label="Address"
        required
      />
    </GridContainer>
  );
};

export default ContactSubForm;
