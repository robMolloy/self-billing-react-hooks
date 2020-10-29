import React from "react";
import MUIGrid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: "0px",
    fontFamily: theme.typography.fontFamily,
    display: "flex",
  },
}));

const GridItem = ({ xs = 12, children, ...props }) => {
  const classes = useStyles();

  return (
    <MUIGrid item className={classes.grid} {...{ xs, ...props }}>
      {children}
    </MUIGrid>
  );
};

export default GridItem;
