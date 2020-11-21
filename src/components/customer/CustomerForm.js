import React from "react";

import rhfListObject from "../../user_modules/rhfListObject";

import { contactBlankRow } from "../../object_info/blankRows";

// import CustomerFormControls from "./CustomerFormControls";
import CustomerFormBody from "./CustomerFormBody";
import ContactFormList from "../contact/ContactFormList";

import MainContainer from "../customComponents/MainContainer";
import GridContainer from "../customComponents/GridContainer";
import GridButton from "../customComponents/GridButton";
import GridItem from "../customComponents/GridItem";
import Form from "../customComponents/Form";

import useContactsOnCustomerContext from "../../custom_hooks/useContactsOnCustomerContext";

const CustomerForm = () => {
  console.log("customer form rendser");

  let [formState, setFormState] = React.useState({});
  let [formListState, setFormListState] = React.useState({});
  let [formReset, setFormReset] = React.useState(false);

  React.useEffect(() => {
    if (formReset) setFormReset(false);
  }, [formReset, setFormReset]);

  // React.useEffect(() => {}, [formListState, setFormListState]);

  let { addContactsOnCustomer } = useContactsOnCustomerContext();

  let list = new rhfListObject({
    formListState,
    setFormListState,
    defaultValues: { ...contactBlankRow, con_type: "phone" },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    if (!(await formState.isValid())) valid = false;
    if (!(await list.isValid())) valid = false;

    if (valid) {
      const contacts = await list.getValues();
      const customer = await formState.getValues();

      addContactsOnCustomer({ contacts, customer });

      // list reset must take place first, why ?????? - to do with render?
      list.reset();
      resetForm();
    }
  };

  const resetForm = () => {
    formState = {};
    setFormState(formState);
    setFormReset(true);
  };

  return (
    <MainContainer>
      <Form onSubmit={async (e) => onSubmit(e)}>
        <GridContainer style={{ minHeight: "144px" }}>
          {!formReset && <CustomerFormBody {...{ formState, setFormState }} />}
        </GridContainer>
        <GridContainer>
          <GridItem
            xs={10}
            //  alignItems="center"
            children="Add Contact"
          />

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => list.addItem()}
            children="+"
          />

          {/* {true && (
            <CustomerFormControls
              {...{
                formState,
                setFormState,
                formListState,
                setFormListState,
                list,
                setFormReset,
              }}
            />
          )} */}

          <ContactFormList {...{ formListState, setFormListState }} />

          <GridButton type="submit">Submit</GridButton>
        </GridContainer>
      </Form>
    </MainContainer>
  );
};

export default CustomerForm;
