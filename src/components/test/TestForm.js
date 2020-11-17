import React from "react";

import { useForm } from "react-hook-form";
import rhfProps from "../../user_modules/rhfProps";
import formProps from "../../user_modules/rhfFormProps";
// import { yupResolver } from "@hookform/resolvers/yup";

import MainContainer from "../customComponents/MainContainer";
import Form from "../customComponents/Form";
import GridButton from "../customComponents/GridButton";
import GridItem from "../customComponents/GridItem";
import GridInput from "../customComponents/GridInput";
import GridContainer from "../customComponents/GridContainer";
import TestItemSubForm from "./TestItemSubForm";
import rhfListObject from "../../user_modules/rhfListObject";

import Schema from "../customer/CustomerSchema";
import { customerBlankRow } from "../../object_info/blankRows";

import { v4 as uuid } from "uuid";

const TestForm = () => {
  let [count, setCount] = React.useState(0);
  const [listState, setListState] = React.useState({});

  const list = new rhfListObject({
    listState,
    setListState,
    defaultValues: { id: "", test_input: "", test_input2: "" },
  });

  // React.useEffect(() => {
  //   list.triggerChanged();
  //   console.log("render");
  // }, [list]);
  React.useEffect(() => console.log("render"));

  // React.useEffect(() => {
  //   setCount(count + 1);
  //   console.log(count);
  // }, [count]);

  const form = useForm(formProps({ defaultValues: customerBlankRow, Schema }));
  const { register, errors } = form;

  form.valid = async () => {
    await form.trigger();
    return Object.keys(form.errors).length === 0;
  };

  return (
    <MainContainer>
      <Form>
        <GridContainer>
          <GridItem xs={10}>Test</GridItem>
          <GridInput
            autoFocus
            label="First Name"
            {...rhfProps({ name: "cus_first_name", register, errors })}
          />

          <GridInput
            label="Last Name"
            {...rhfProps({ name: "cus_last_name", register, errors })}
          />

          <GridButton grid={{ xs: 2 }} onClick={() => list.addItem()}>
            +
          </GridButton>

          <GridButton onClick={() => console.log(listState)}>Log</GridButton>

          <GridButton onClick={() => list.trigger()}>trigger list</GridButton>
          <GridButton onClick={() => form.trigger()}>trigger form</GridButton>

          <GridButton
            onClick={async () => {
              console.log(await form.valid());
              console.log(await list.valid());
            }}
          >
            trigger both
          </GridButton>

          <GridButton
            onClick={() => {
              let id0 = Object.keys(listState)[0];
              listState[id0].setValue("test_input", 1);
              listState[id0].values["test_input"] = 1;
            }}
          >
            setValue
          </GridButton>

          {Object.values(listState).map((listItem) => (
            <TestItemSubForm
              {...{
                key: uuid(),
                values: listItem.values,
                listState,
                setListState,
              }}
            />
          ))}
        </GridContainer>
      </Form>
    </MainContainer>
  );
};

export default TestForm;
