import React from "react";
import Grid from "./Grid";

const GridContainer = ({ children, ...props }) => {
  return (
    <Grid container spacing={2} {...props}>
      {children}
    </Grid>
  );
};

export default GridContainer;
