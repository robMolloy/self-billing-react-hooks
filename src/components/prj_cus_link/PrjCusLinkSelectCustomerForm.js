import React from "react";
import { CustomerContext } from "../../contexts/CustomerContext";

import GridSelect from "../customComponents/GridSelect";
import Option from "../customComponents/Option";
import Schema from "../../schemas/CustomerSchema";
import { prjCusLinkBlankRow } from "../../object_info/blankRows";

import useForm from "../../custom_hooks/useRHForm";

const PrjCusLinkSelectCustomerForm = (props) => {
  let values, state, setState;
  ({ values = prjCusLinkBlankRow, state, setState } = props);

  const id = values.id;

  React.useEffect(() => {
    state.customers = state?.prjCusLinks ?? {};

    let controls = state?.prjCusLinks?.controls ?? {};
    let stateValues = state?.prjCusLinks?.values ?? {};

    state.prjCusLinks.values = { ...stateValues, [id]: values };
    state.prjCusLinks.controls = { ...controls, [id]: form };

    setState(state);

    //eslint-disable-next-line
  }, []);

  const form = useForm({
    defaultValues: values,
    Schema,
    objectType: "prjCusLinks",
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
      {...form.fieldProps("prj_cus_link_cus_id")}
      onChange={(e) =>
        form.setFieldValue("prj_cus_link_cus_id", e.target.value)
      }
    >
      {customerOptions}
    </GridSelect>
  );
};

export default PrjCusLinkSelectCustomerForm;
