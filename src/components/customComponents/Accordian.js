import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MUIAccordionSummary from "@material-ui/core/AccordionSummary";
import MUIAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MUIAccordion from "@material-ui/core/Accordion";

const useStyles = makeStyles((theme) => ({
  accordian: { width: "100%" },
}));

const Accordian = ({ summary, children, ...props }) => {
  const classes = useStyles();

  return (
    <MUIAccordion className={classes.accordian} {...props}>
      <MUIAccordionSummary expandIcon={<ExpandMoreIcon />}>
        {summary}
      </MUIAccordionSummary>
      <MUIAccordionDetails>{children}</MUIAccordionDetails>
    </MUIAccordion>
  );
};

export default Accordian;
