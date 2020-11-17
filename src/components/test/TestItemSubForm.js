import React from "react";
import { useForm } from "react-hook-form";

import GridButton from "../customComponents/GridButton";
import GridInput from "../customComponents/GridInput";

import * as yup from "yup";

import rhfProps from "../../user_modules/rhfProps";
import formProps from "../../user_modules/rhfFormProps";
import rhfListItemObject from "../../user_modules/rhfListItemObject";

// import { v4 as uuid } from "uuid";

const Schema = yup.object().shape({
  test_input: yup
    .string()
    .matches(/^([^0-9]*)$/, "input should not contain numbers")
    .required("input is a required field"),
  test_input2: yup
    .string()
    .matches(/^([^0-9]*)$/, "input should not contain numbers")
    .required("input is a required field"),
});

const TestItemSubForm = (props) => {
  let values, listState, setListState;
  ({ values, listState, setListState } = props);

  const id = values.id;
  // const exists = !!values;

  const form = useForm(formProps({ defaultValues: values, Schema }));
  let { register, errors } = form;

  React.useEffect(() => {
    listState[id] = { ...listState[id], ...form };
    setListState(listState);
    listItem.triggerIfChanged();
  }, [listState]);

  const listItem = new rhfListItemObject({
    defaultValues: { id: "", test_input: "", test_input2: "" },
    listState,
    setListState,
    form,
    id,
  });

  return (
    <>
      <GridInput
        grid={{ xs: 5 }}
        label="test_input"
        {...rhfProps({ name: "test_input", register, errors })}
        onChange={(e) => listItem.setFieldState("test_input", e.target.value)}
      />

      <GridInput
        grid={{ xs: 5 }}
        label="test_input2"
        {...rhfProps({ name: "test_input2", register, errors })}
        onChange={(e) => listItem.setFieldState("test_input2", e.target.value)}
      />

      <GridButton grid={{ xs: 2 }} onClick={() => listItem.remove()}>
        x
      </GridButton>
    </>
  );
};

export default TestItemSubForm;
