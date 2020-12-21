import React from "react";
import { CustomerContext } from "../../contexts/CustomerContext";

import GridSelect from "../customComponents/GridSelect";
import Option from "../customComponents/Option";
import Schema from "../../schemas/CustomerSchema";
import { customerBlankRow } from "../../object_info/blankRows";

import useForm from "../../custom_hooks/useRHForm";

const CustomerFormSelect = (props) => {
  let values, state, setState;
  ({ values = customerBlankRow, state, setState } = props);

  const id = values.id;

  React.useEffect(() => {
    state.customers = state?.customers ?? {};

    let controls = state?.customers?.controls ?? {};
    let stateValues = state?.customers?.values ?? {};

    state.customers.values = { ...stateValues, [id]: values };
    state.customers.controls = { ...controls, [id]: form };

    setState(state);

    //eslint-disable-next-line
  }, []);

  const form = useForm({
    defaultValues: values,
    Schema,
    objectType: "customers",
    state,
    setState,
    id,
  });

  const { customers } = React.useContext(CustomerContext);

  const customerOptions = Object.entries(customers).map(([id, customer]) => (
    <Option key={id} value={id}>
      {`${customer.cus_first_name} ${customer.cus_last_name}`}
    </Option>
  ));

  return (
    <GridSelect
      autoFocus
      label="Customer"
      {...form.fieldProps("cus_id")}
      onChange={(e) => form.setFieldValue("cus_id", e.target.value)}
    >
      {customerOptions}
    </GridSelect>
  );
};

export default CustomerFormSelect;

// import React from "react";

// const CustomerSelect = (props) => {
//   let label, grid;
//   ({ label = "Customer", grid } = props);

//   const { customers } = React.useContext(CustomerContext);

//   const customerOptions = Object.entries(customers).map(([id, customer]) => (
//     <Option key={id} value={id}>
//       {`${customer.cus_first_name} ${customer.cus_last_name}`}
//     </Option>
//   ));

//   return <GridSelect {...{ label, grid }}>{customerOptions}</GridSelect>;
// };

// export default CustomerSelect;
