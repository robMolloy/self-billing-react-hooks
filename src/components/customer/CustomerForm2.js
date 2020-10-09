import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import valid9 from "valid9";
import useCustomerReducer from "../../custom_hooks/useCustomerReducer";
import ContactSubForm from "../contact/ContactSubForm";
import { contactBlankRow, customerBlankRow } from "../../object_info/blankRows";
import { TextField, Container } from "@material-ui/core";
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
          onChange={(e) => toggleClassIfInvalid(e.target)}
          // ref={register({ required: true, minLength: 2 })}
          // checks="minChars_2"
          defaultValue={customer.cus_first_name}
          required
          autoFocus
        />

        {/* <div className="inputWrapper">
          <input
            type="text"
            name="cus_first_name"
            placeholder=" "
            onChange={(e) => toggleClassIfInvalid(e.target)}
            ref={register({ required: true, minLength: 2 })}
            checks="minChars_2"
            defaultValue={customer.cus_first_name}
          />
          <label>
            <span>First Name</span>
          </label>
        </div> */}

        <TextField
          type="text"
          name="cus_last_name"
          label="cus_last_name"
          ref={register({ required: true, minLength: 2 })}
          checks="minChars_2"
          defaultValue={customer.cus_last_name}
          required
        />
        {/* <div className="inputWrapper">
          <input
            type="text"
            name="cus_last_name"
            placeholder=" "
            ref={register({ required: true, minLength: 2 })}
            checks="minChars_2"
            defaultValue={customer.cus_last_name}
          />
          <label>
            <span>Last Name</span>
          </label>
        </div> */}

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
