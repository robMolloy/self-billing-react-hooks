import React from "react";
import MUIGrid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  grid: { padding: "0px" },
}));

const GridItem = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <MUIGrid item className={classes.grid} {...props}>
      {children}
    </MUIGrid>
  );
};

export default GridItem;
