import React from "react";
import MUIGrid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  grid: { padding: "0px" },
}));

const GridItem = ({ xs, children, ...props }) => {
  xs = xs === undefined ? 12 : xs;

  const classes = useStyles();

  return (
    <MUIGrid item xs={xs} className={classes.grid} {...props}>
      {children}
    </MUIGrid>
  );
};

export default GridItem;
