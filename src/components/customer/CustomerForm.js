import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import GridButton from "../custom/GridButton";
import GridItem from "../custom/GridItem";
import MainContainer from "../custom/MainContainer";
import Form from "../custom/Form";
import GridInput from "../custom/GridInput";
import GridContainer from "../custom/GridContainer";

import { contactMethods, contactTypes } from "../../contexts/options";
import { ucFirst } from "../../user_modules/StringManipulation";
import GridSelect from "../custom/GridSelect";
import { v4 as uuid } from "uuid";

import useContactReducer from "../../custom_hooks/useContactReducer";
import useCustomerReducer from "../../custom_hooks/useCustomerReducer";

// import { CustomerContext } from "../../contexts/CustomerContext";
// import { ContactContext } from "../../contexts/ContactContext";
// import React, { useState, useContext } from "react";
// import { ContactsOnCustomerContext } from "../../contexts/ContactsOnCustomerContext";

// import ContactSubForm from "../contact/ContactSubForm";

// import React, { useState } from "react";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import GridInput from "../custom/GridInput";
// import GridButton from "../custom/GridButton";
// import GridContainer from "../custom/GridContainer";

// import React from "react";
// import { contactBlankRow } from "../../object_info/blankRows";

const schema = yup.object().shape({
  cus_first_name: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
  cus_last_name: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
});

const CustomerForm = ({ contacts, ...props }) => {
  contacts = contacts === undefined ? {} : contacts;

  const { addCustomer } = useCustomerReducer();
  const { addContacts } = useContactReducer();

  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: { cus_first_name: "", cus_last_name: "" },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const cus_first_name = watch("cus_first_name");
  const cus_last_name = watch("cus_last_name");

  const con_type = watch("con_type");

  let showContactForm =
    !!cus_first_name &&
    !!cus_last_name &&
    !errors.cus_first_name &&
    !errors.cus_last_name;

  let [contactsState, setContactsState] = useState(contacts);

  const onSubmit = (data, blah) => {
    const id = uuid();
    const { cus_first_name, cus_last_name } = data;

    addCustomer({ id, cus_first_name, cus_last_name });
    addContacts(contactsState, id);
  };

  return (
    <MainContainer maxWidth="sm">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <GridContainer>
          <GridInput
            grid={{ xs: 12 }}
            ref={register}
            name="cus_first_name"
            label="First Name"
            autoFocus
            error={!!errors.cus_first_name}
            helperText={errors?.cus_first_name?.message}
          />
          <GridInput
            ref={register}
            name="cus_last_name"
            label="Last Name"
            error={!!errors.cus_last_name}
            helperText={errors?.cus_last_name?.message}
          />
          {showContactForm && (
            <>
              <GridItem>Contacts</GridItem>

              <GridSelect
                grid={{ xs: 6, sm: 2 }}
                inputRef={register}
                defaultValue=""
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
                grid={{ xs: 6, sm: 2 }}
                inputRef={register}
                name="con_method"
                defaultValue=""
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
                grid={{ xs: 9, sm: 5 }}
                ref={register}
                defaultValue=""
                name="con_address"
                label="Address"
                required
              />
              <GridButton
                grid={{ xs: 3 }}
                variant="outlined"
                onClick={() => {
                  let data = getValues();

                  let newContact = {
                    con_type: data.con_type,
                    con_method: data.con_method,
                    con_address: data.con_address,
                  };

                  setContactsState({ ...contactsState, [uuid()]: newContact });

                  setValue("con_type", "");
                  setValue("con_method", "");
                  setValue("con_address", "");
                }}
              >
                +
              </GridButton>
            </>
          )}
          {Object.values(contactsState).map((contact) => (
            <React.Fragment key={uuid()}>
              <GridItem xs={4}>{contact.con_type}</GridItem>
              <GridItem xs={4}>{contact.con_method}</GridItem>
              <GridItem xs={4}>{contact.con_address}</GridItem>
            </React.Fragment>
          ))}
          <GridButton type="submit">Submit</GridButton>
        </GridContainer>
      </Form>
    </MainContainer>
  );
};

export default CustomerForm;
