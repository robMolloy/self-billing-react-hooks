import React from "react";
import Select from "./Select";
import Grid from "@material-ui/core/Grid";

const GridInput = ({ grid, children, ...props }) => {
  return (
    <Grid item {...grid}>
      <Select {...props}>{children}</Select>
    </Grid>
  );
};

export default GridInput;
