import React from "react";

// import rhfListObject from "../../user_modules/rhfListObject";

// import { contactBlankRow } from "../../object_info/blankRows";
import { getBlankCustomers } from "../../object_info/blankObjects";
import { contactBlankRow, customerBlankRow } from "../../object_info/blankRows";

// import CustomerFormControls from "./CustomerFormControls";
// import CustomerFormBody from "./CustomerFormBody";
import ContactFormList from "../contact/ContactFormList";
import CustomerFormList from "../customer/CustomerFormList";
// import CustomerFormListItem from "../customer/CustomerFormListItem";

import MainContainer from "../customComponents/MainContainer";
import GridContainer from "../customComponents/GridContainer";
import GridButton from "../customComponents/GridButton";
import GridItem from "../customComponents/GridItem";
import Form from "../customComponents/Form";

import useContactsOnCustomerContext from "../../custom_hooks/useContactsOnCustomerContext";
import rhfListObject from "../../user_modules/rhfListObject";

// customers = {
//   values: {
//     id1: { id: "id1", cus_first_name: "rob" },
//     id2: { id: "id2", cus_first_name: "rob", cus_last_name: "roberts" },
//   },
// };
// contacts = {
//   values: {
//     id1: { id: "id1", con_type: "email" },
//     id2: { id: "id2", con_type: "phone", con_address: "07777" },
//   },
// };

const CustomerForm = (props) => {
  let contacts, customers, exists, setModalCustomer;
  ({
    contacts = {},
    customers = getBlankCustomers(),
    setModalCustomer,
    exists = false,
  } = props);

  // console.log(contacts);
  // console.log(customers);

  let [state, setState] = React.useState({
    contacts: { values: contacts },
    customers: { values: customers },
  });

  let { addContactsOnCustomer } = useContactsOnCustomerContext();

  let contactList = new rhfListObject({
    defaultValues: { ...contactBlankRow, con_type: "phone" },
    objectType: "contacts",
    state,
    setState,
  });
  let customerList = new rhfListObject({
    defaultValues: { ...customerBlankRow },
    objectType: "customers",
    state,
    setState,
  });

  //eslint-disable-next-line
  React.useEffect(() => {
    contactList.triggerFieldIfChanged();
    customerList.triggerFieldIfChanged();
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    if (!(await customerList.isValid())) valid = false;
    if (!(await contactList.isValid())) valid = false;

    if (valid) {
      let customer = Object.values(customerList.getObjects())[0];
      let contacts = contactList.getObjects();

      addContactsOnCustomer({ contacts, customer });

      setState({});
      if (exists) setModalCustomer(undefined);
    }
  };

  return (
    <MainContainer>
      <Form onSubmit={async (e) => onSubmit(e)}>
        <GridContainer style={{ minHeight: "144px" }}>
          <CustomerFormList
            {...{
              values: state?.customers?.values ?? getBlankCustomers(),
              setState,
              state,
              type: "body",
            }}
          />
        </GridContainer>
        <GridContainer>
          <GridItem xs={10} children="Add Contact" />

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => contactList.addItem()}
            children="+"
          />

          <ContactFormList
            {...{ state, setState, values: state?.contacts?.values }}
          />

          <GridButton type="submit">Submit</GridButton>
        </GridContainer>
      </Form>
    </MainContainer>
  );
};

export default CustomerForm;
