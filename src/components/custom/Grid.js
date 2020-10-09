import React from "react";
import MUIGrid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({ grid: { padding: 0 } }));

const Grid = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <MUIGrid className={classes.grid} {...props}>
      {children}
    </MUIGrid>
  );
};

export default Grid;
