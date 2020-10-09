import React, { useContext } from "react";
import { CustomerContext } from "../../contexts/CustomerContext";
// import { ucFirst } from "../../user_modules/StringManipulation";
import valid9 from "valid9";
const { toggleClassIfInvalid } = valid9;

const PrjCusLinkCustomerSubForm = (props) => {
  const { prjCusLink } = props;
  const { customers } = useContext(CustomerContext);
  return (
    <React.Fragment>
      <div className="inputWrapper flex1">
        <select
          name="pcl_cus_id"
          onChange={(e) => toggleClassIfInvalid(e.target)}
          defaultValue={prjCusLink.pcl_cus_id}
          required
        >
          <option disabled hidden value={""}></option>
          {Object.values(customers).map((customer) => {
            const { id, cus_first_name, cus_last_name } = customer;
            return (
              <option key={id} value={id}>
                {cus_first_name} {cus_last_name}
              </option>
            );
          })}
        </select>
        <label>
          <span>Customer Id</span>
        </label>
      </div>
    </React.Fragment>
  );
};

export default PrjCusLinkCustomerSubForm;
