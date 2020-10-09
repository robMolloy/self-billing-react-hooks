import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import { contactMethods } from "../../contexts/options";
import { ucFirst } from "../../user_modules/StringManipulation";
import MenuItem from "@material-ui/core/MenuItem";
import GridInput from "../custom/GridInput";
import GridSelect from "../custom/GridSelect";

import { contactBlankRow } from "../../object_info/blankRows";
import { Grid } from "@material-ui/core";

const schema = yup.object().shape({
  con_name: yup.string().required("Contact name is a required field"),
  con_address: yup.string().required("Contact address is a required field"),
});

const ContactSubForm = ({ contact, ...props }) => {
  const { watch } = useForm();
  const con_type = watch("con_type");
  contact = contact === undefined ? contactBlankRow : contact;
  // let [age, setAge] = useState();

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <Grid container spacing={2}>
      <GridSelect
        grid={{ xs: 6 }}
        name="con_method"
        defaultValue={contact.con_method}
        required={con_type === "phone" ? true : false}
        label="Method"
      >
        <MenuItem disabled value={""}></MenuItem>
        {contactMethods.map((contactMethod) => (
          <MenuItem key={contactMethod} value={contactMethod}>
            {ucFirst(contactMethod)}
          </MenuItem>
        ))}
      </GridSelect>

      <GridInput
        grid={{ xs: 6 }}
        ref={register}
        defaultValue={contact.con_address}
        name="con_address"
        label="Address"
        required
      />
    </Grid>
  );
};

export default ContactSubForm;
