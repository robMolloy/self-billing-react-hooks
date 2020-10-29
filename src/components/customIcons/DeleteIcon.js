import React from "react";
import MUIDeleteIcon from "@material-ui/icons/HighlightOff";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  icon: { cursor: "pointer" },
}));

const DeleteIcon = (props) => {
  const classes = useStyles();

  return <MUIDeleteIcon className={classes.icon} {...props} />;
};

export default DeleteIcon;
