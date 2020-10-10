// import React, { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ContactSubForm from "../contact/ContactSubForm";

import GridButton from "../custom/GridButton";
import GridItem from "../custom/GridItem";
import MainContainer from "../custom/MainContainer";
import Form from "../custom/Form";
import GridInput from "../custom/GridInput";
import GridContainer from "../custom/GridContainer";

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

// defaultValues: {
//   cus_first_name: data.cus_first_name,
//   cus_last_name: data.cus_last_name,
// },

const CustomerForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // const [contactRows, setContactRows] = useState([]);

  const onSubmit = (data) => {
    // console.log(contactRows);
    // console.log(data);
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
            error={!!errors.cus_first_name}
            helperText={errors?.cus_first_name?.message}
          />
          <GridInput
            grid={{ xs: 12 }}
            ref={register}
            name="cus_last_name"
            label="Last Name"
            error={!!errors.cus_last_name}
            helperText={errors?.cus_last_name?.message}
          />
          <GridItem xs={12}>
            <ContactSubForm />
          </GridItem>
          <GridButton grid={{ xs: 12 }}>Submit</GridButton>
        </GridContainer>
      </Form>
    </MainContainer>
  );
};

export default CustomerForm;

//   <div>
//   {Object.entries(contact_sub_forms).map((entry) => {
//     const temp_id = entry[0];
//     const contact = entry[1];
//     return (
//       <div key={temp_id} className="flex1 flexGap ac">
//         <ContactSubForm contact={contact} />
//         <div onClick={() => removeContactSubForm(temp_id)}>X</div>
//       </div>
//     );
//   })}
// </div>
/*

import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import valid9 from "valid9";
import useCustomerReducer from "../../custom_hooks/useCustomerReducer";
import ContactSubForm from "../contact/ContactSubForm";
import { contactBlankRow, customerBlankRow } from "../../object_info/blankRows";
import { TextField, Container } from "@material-ui/core";
import Input from "../custom/Input";
// import { Select, Input, TextField, Container } from "@material-ui/core";

const { getAllInvalid, toggleClassIfInvalid } = valid9;

const CustomerForm = (props) => {
  const blankContact = { [uuid()]: contactBlankRow };

  let { customer, contacts } = props;
  customer = props.customer === undefined ? customerBlankRow : props.customer;
  contacts = props.contacts === undefined ? blankContact : props.contacts;

  const { addCustomerAndContactsUsingInputs } = useCustomerReducer();

  const { register, handleSubmit } = useForm();

  const [contact_sub_forms, setContactSubForms] = useState(contacts);

  const addContactSubForm = () => {
    setContactSubForms({ ...contact_sub_forms, ...blankContact });
  };

  const removeContactSubForm = (temp_id) => {
    let temp_contact_sub_forms = { ...contact_sub_forms };
    delete temp_contact_sub_forms[temp_id];
    setContactSubForms(temp_contact_sub_forms);
  };

  const onSubmit = (inputs, data) => {
    const invalidInputs = getAllInvalid(inputs);
    const valid = invalidInputs.length === 0;

    if (valid) {
      addCustomerAndContactsUsingInputs(inputs);
      Array.from(inputs).forEach((input) => (input.value = ""));
      setContactSubForms({ [uuid]: contactBlankRow });
    }
    (valid ? inputs : invalidInputs)[0].focus();
  };

  return (
    <Container maxWidth="sm">
      <form
        className="container"
        onSubmit={(e) => {
          e.preventDefault();
          const inputs = e.target.elements;
          handleSubmit(onSubmit.bind(this, inputs))();
        }}
      >
        <TextField
          fullWidth={true}
          type="text"
          name="cus_first_name"
          label="cus_first_name"
          defaultValue={customer.cus_first_name}
          required
          autoFocus
        />

        <TextField
          type="text"
          name="cus_last_name"
          label="cus_last_name"
          ref={register({ required: true, minLength: 2 })}
          checks="minChars_2"
          defaultValue={customer.cus_last_name}
          required
        />
        <div className="singleColumn">
          {Object.entries(contact_sub_forms).map((entry) => {
            const temp_id = entry[0];
            const contact = entry[1];
            return (
              <div key={temp_id} className="flex1 flexGap ac">
                <ContactSubForm contact={contact} />
                <div onClick={() => removeContactSubForm(temp_id)}>X</div>
              </div>
            );
          })}
        </div>

        <div>
          <input type="button" onClick={() => addContactSubForm()} value="+" />
          <div className="flex1"></div>
          <button type="submit">Add</button>
        </div>
      </form>
    </Container>
  );
};

export default CustomerForm;
*/
