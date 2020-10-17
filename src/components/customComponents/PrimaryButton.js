import React from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: { height: "56px", borderWidth: "medium" },
}));

const PrimaryButton = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      size="large"
      className={classes.button}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
