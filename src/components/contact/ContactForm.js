import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { CustomerContext } from "../../contexts/CustomerContext";
import CreateInputObject from "../../user_modules/CreateInputObject";
import { contactMethods, contactTypes } from "../../contexts/options";
import { ucFirst } from "../../user_modules/StringManipulation";
import valid9 from "valid9";
import useContactContext from "../../custom_hooks/useContactContext";
const { getAllInvalid, toggleClassIfInvalid } = valid9;

const ContactForm = () => {
  const { addContact } = useContactContext();
  const { customers } = useContext(CustomerContext);

  const { register, handleSubmit, watch } = useForm();
  const con_type = watch("con_type");

  const onSubmit = (inputs, data) => {
    let invalidInputs = getAllInvalid(inputs);
    let valid = invalidInputs.length === 0;

    if (valid) {
      const contact = CreateInputObject(inputs);
      addContact(contact);
      Array.from(inputs).forEach((input) => (input.value = ""));
    }

    (valid ? inputs : invalidInputs)[0].focus();
  };

  return (
    <form
      className="panel"
      onSubmit={(e) => {
        e.preventDefault();
        const inputs = e.target.elements;
        handleSubmit(onSubmit.bind(this, inputs))();
      }}
    >
      <div className="inputWrapper">
        <select
          onChange={(e) => toggleClassIfInvalid(e.target)}
          name="con_cus_id"
          defaultValue={""}
          required
          autoFocus
        >
          <option disabled hidden value={""}></option>
          {Object.values(customers).map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.cus_first_name} {customer.cus_last_name}
            </option>
          ))}
        </select>
        <label>
          <span>Customer Id</span>
        </label>
      </div>

      <div className="inputWrapper">
        <select
          onChange={(e) => toggleClassIfInvalid(e.target)}
          name="con_type"
          defaultValue={""}
          ref={register({ required: true })}
          required
        >
          <option disabled hidden value={""}></option>
          {contactTypes.map((contactType) => (
            <option key={contactType} value={contactType}>
              {ucFirst(contactType)}
            </option>
          ))}
        </select>
        <label>
          <span>con_type</span>
        </label>
      </div>
      {con_type === "phone" && (
        <div className="inputWrapper">
          <select
            onChange={(e) => toggleClassIfInvalid(e.target)}
            name="con_method"
            defaultValue={""}
            required
          >
            <option disabled hidden value={""}></option>
            {contactMethods.map((contactMethod) => (
              <option key={contactMethod} value={contactMethod}>
                {ucFirst(contactMethod)}
              </option>
            ))}
          </select>
          <label>
            <span>con_method</span>
          </label>
        </div>
      )}
      <div className="inputWrapper">
        <input
          defaultValue={""}
          type="text"
          name="con_address"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          checks="minChars_2"
          ref={register({ required: true, minLength: 2 })}
          required
        />
        <label>
          <span>Address</span>
        </label>
      </div>

      <div className="jr">
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default ContactForm;
