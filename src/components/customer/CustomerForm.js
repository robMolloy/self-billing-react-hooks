import React from "react";

// import rhfListObject from "../../user_modules/rhfListObject";

// import { contactBlankRow } from "../../object_info/blankRows";
import {
  getBlankContacts,
  getBlankCustomers,
} from "../../object_info/blankObjects";

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
  let contacts, customers;
  ({ contacts = {}, customers = getBlankCustomers() } = props);

  let [state, setState] = React.useState({
    contacts: { values: contacts },
    customers: { values: customers },
  });
  console.log(state);

  let { addContactsOnCustomer } = useContactsOnCustomerContext();

  // let list = new rhfListObject({
  //   setState,
  //   setFormListState,
  //   defaultValues: { ...contactBlankRow, con_type: "phone" },
  // });

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   let valid = true;
  //   if (!(await formState.isValid())) valid = false;
  //   if (!(await list.isValid())) valid = false;

  //   if (valid) {
  //     const contacts = await list.getValues();
  //     const customer = await formState.getValues();

  //     addContactsOnCustomer({ contacts, customer });

  //     // list reset must take place first, why ?????? - to do with render?
  //     list.reset();
  //     resetForm();
  //   }
  // };

  const addItem = () => {
    let contacts = state?.contacts?.values ?? {};
    Object.assign(contacts, getBlankContacts(1, { con_type: "phone" }));

    // contacts can be missing from state if state set to {}
    state.contacts = state.contacts ?? {};
    state.contacts.values = contacts;
    setState({ ...state });
  };

  // const triggerAll = (objectType) => {
  //   return new Promise(async (resolve) => {
  //     for (let listItem of Object.values(this.formListState)) {
  //       await listItem.trigger();
  //     }
  //     resolve(true);
  //   });
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    for (let controls of Object.values(state?.customers?.controls ?? {})) {
      await controls.trigger();
      if (Object.keys(controls.errors).length !== 0) valid = false;
    }

    for (let controls of Object.values(state?.contacts?.controls ?? {})) {
      await controls.trigger();
      if (Object.keys(controls.errors).length !== 0) valid = false;
    }

    if (valid) {
      addContactsOnCustomer({
        contacts: state?.contacts?.values ?? {},
        customer: Object.values(state.customers.values)[0],
      });
      setState({});
    }
  };

  return (
    <MainContainer>
      <Form onSubmit={async (e) => onSubmit(e)}>
        <GridContainer style={{ minHeight: "144px" }}>
          <CustomerFormList
            {...{
              state,
              setState,
              values: state?.customers?.values ?? getBlankCustomers(),
              type: "body",
            }}
          />
        </GridContainer>
        <GridContainer>
          <GridItem xs={10} children="Add Contact" />

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => addItem()}
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
