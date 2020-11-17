import React from "react";
import MainContainer from "../customComponents/MainContainer";
import Form from "../customComponents/Form";
import GridButton from "../customComponents/GridButton";
import GridItem from "../customComponents/GridItem";
import GridContainer from "../customComponents/GridContainer";
import TestItemSubForm from "./TestItemSubForm";
import rhfListObject from "../../user_modules/rhfListObject";

import { v4 as uuid } from "uuid";

const TestForm = () => {
  const [listState, setListState] = React.useState({});

  React.useEffect(() => list.triggerChanged());

  const list = new rhfListObject({
    listState,
    setListState,
    defaultValues: { id: "", test_input: "", test_input2: "" },
  });

  return (
    <MainContainer>
      <Form>
        <GridContainer>
          <GridItem xs={10}>Test</GridItem>
          <GridButton grid={{ xs: 2 }} onClick={() => list.addItem()}>
            +
          </GridButton>

          <GridButton onClick={() => console.log(listState)}>Log</GridButton>

          <GridButton
            onClick={() => {
              Object.values(listState).forEach((value) => value.trigger());
            }}
          >
            trigger
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
