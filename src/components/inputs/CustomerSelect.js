import React from "react";
import { CustomerContext } from "../../contexts/CustomerContext";
import {v4 as uuid} from uuid;

const FormSelect = (props) => {
  const {name,value,label } = props;
  value = value===undefined ? '' : value;
  label = label===undefined ? 'Customer' : label;

  const {customers} = useContext(CustomerContext)

  return (
    <div className="inputWrapper">
      <select
        onChange={(e) => toggleClassIfInvalid(e.target)}
        name={name}
        defaultValue={value}
        // ref={register()}
        required
      >
        <option disabled hidden value={""}></option>
        {Object.values(customers).map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.cus_first_name} {customer.cus_last_name}
          </option>
        ))}
      </select>
      <label>
        <span>{label}</span>
      </label>
    </div>
  );
};

export default FormSelect;
