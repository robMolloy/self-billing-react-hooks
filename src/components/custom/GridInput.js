import React, { forwardRef } from "react";
import Input from "./Input";
import GridItem from "./GridItem";

const GridInput = forwardRef(({ grid, ...props }, ref) => {
  return (
    <GridItem {...grid}>
      <Input ref={ref} {...props} />
    </GridItem>
  );
});

export default GridInput;
