import React from "react";
import GridItem from "../customComponents/GridItem";
import GridButton from "../customComponents/GridButton";

const CustomerFormControls = (props) => {
  let formState,
    setFormState,
    formListState,
    setFormListState,
    list,
    setFormReset;
  ({
    formState,
    setFormState,
    formListState,
    setFormListState,
    list,
    setFormReset,
  } = props);
  return (
    <>
      <GridButton
        grid={{ xs: 2 }}
        variant="outlined"
        onClick={() => {
          if (true) {
            setFormState({});
            setFormReset(true);
          }
        }}
        children="form reset"
      />
      <GridButton
        grid={{ xs: 2 }}
        variant="outlined"
        onClick={() => setFormListState({})}
        children="List reset"
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
        grid={{ xs: 2 }}
        variant="outlined"
        onClick={() => {
          formState.trigger();
          list.trigger();
        }}
        children="trigger both"
      />

      <GridButton
        grid={{ xs: 2 }}
        variant="outlined"
        onClick={() => {
          setFormState({ ...formState });
        }}
        children="rerender"
      />
      <GridButton
        grid={{ xs: 2 }}
        variant="outlined"
        onClick={() => {
          Object.assign(formState, {});
          setFormState(formState);
        }}
        children="copy formState"
      />
      <GridButton
        grid={{ xs: 2 }}
        variant="outlined"
        onClick={() => console.log(formState.isErrors())}
        children="log is errors"
      />
      <GridButton
        grid={{ xs: 2 }}
        variant="outlined"
        onClick={async () => console.log(await formState.isValid())}
        children="form isValid"
      />
      <GridButton
        grid={{ xs: 2 }}
        variant="outlined"
        onClick={async () => console.log(await list.getValues())}
        children="listValues"
      />
      <GridButton
        grid={{ xs: 2 }}
        variant="outlined"
        onClick={async () => console.log(await list.isValid())}
        children="listValid"
      />
      <GridItem />
    </>
  );
};

export default CustomerFormControls;
