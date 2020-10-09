import React, { forwardRef } from "react";
import Input from "./Input";
import Grid from "@material-ui/core/Grid";

const GridInput = forwardRef(({ grid, ...props }, ref) => {
  return (
    <Grid item {...grid}>
      <Input ref={ref} {...props} />
    </Grid>
  );
});

export default GridInput;
