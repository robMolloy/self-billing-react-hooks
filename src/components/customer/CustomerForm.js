import React from "react";

import rhfListObject from "../../user_modules/rhfListObject";

import { contactBlankRow } from "../../object_info/blankRows";

import CustomerFormBody from "./CustomerFormBody";
import ContactFormList from "../contact/ContactFormList";

import MainContainer from "../customComponents/MainContainer";
import GridContainer from "../customComponents/GridContainer";
import GridButton from "../customComponents/GridButton";
import GridItem from "../customComponents/GridItem";
import Form from "../customComponents/Form";

const CustomerForm = () => {
  let [formState, setFormState] = React.useState({});
  let [formListState, setFormListState] = React.useState({});

  const list = new rhfListObject({
    formListState,
    setFormListState,
    defaultValues: contactBlankRow,
  });

  return (
    <MainContainer>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
        }}
      >
        <GridContainer>
          <CustomerFormBody {...{ formState, setFormState }} />

          <GridItem
            //  alignItems="center"
            children="Add Contact"
          />

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => list.addItem()}
            children="+"
          />

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => list.trigger()}
            children="t"
          />

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={async () => console.log(await formState.getValues())}
            children="values"
          />

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => list.trigger()}
            children=" list t"
          />

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => console.log(formListState)}
            children=" log listState"
          />

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => console.log(list.errors)}
            children=" list err"
          />

          <GridButton
            variant="outlined"
            onClick={() => {
              formState.trigger();
              list.trigger();
            }}
            children="trigger both"
          />

          <GridButton
            variant="outlined"
            onClick={() => {
              setFormState({ ...formState });
            }}
            children="force render"
          />
          <GridButton
            variant="outlined"
            onClick={() => {
              Object.assign(formState, {});
              setFormState(formState);
            }}
            children="copy formState"
          />
          <GridButton
            variant="outlined"
            onClick={() => console.log(formState.isErrors())}
            children="log is errors"
          />
          <GridButton
            variant="outlined"
            onClick={async () => console.log(await formState.isValid())}
            children="log is valid"
          />

          <ContactFormList {...{ formListState, setFormListState }} />

          <GridButton type="submit">Submit</GridButton>
        </GridContainer>
      </Form>
    </MainContainer>
  );
};

export default CustomerForm;
