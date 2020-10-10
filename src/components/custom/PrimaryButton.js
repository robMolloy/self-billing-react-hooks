import React from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {},
}));

const PrimaryButton = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
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
