import React from "react";
import GridItem from "./GridItem";
import PrimaryButton from "./PrimaryButton";

const GridButton = ({ grid, children, ...props }) => {
  return (
    <GridItem {...grid}>
      <PrimaryButton {...props}>{children}</PrimaryButton>
    </GridItem>
  );
};

export default GridButton;
