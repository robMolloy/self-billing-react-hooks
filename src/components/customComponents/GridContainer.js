import React from "react";
import MUIGrid from "@material-ui/core/Grid";

const GridContainer = ({ children, ...props }) => {
  return (
    <MUIGrid container spacing={2} {...props}>
      {children}
    </MUIGrid>
  );
};

export default GridContainer;
