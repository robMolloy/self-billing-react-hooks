import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MUIAccordion from "@material-ui/core/Accordion";

const useStyles = makeStyles((theme) => ({
  accordian: { width: "100%" },
}));

const AccordianContainer = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <MUIAccordion className={classes.accordian} {...props}>
      {children}
    </MUIAccordion>
  );
};

export default AccordianContainer;
