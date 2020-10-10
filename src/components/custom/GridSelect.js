import React, { forwardRef } from "react";
import Select from "./Select";
import GridItem from "./GridItem";
// import Grid from "@material-ui/core/Grid";

const GridSelect = forwardRef(({ grid, children, ...props }, ref) => {
  return (
    <GridItem {...grid}>
      <Select ref={ref} {...props}>
        {children}
      </Select>
    </GridItem>
  );
});

export default GridSelect;
