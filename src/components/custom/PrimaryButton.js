import React from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "24px 0",
  },
}));

const PrimaryButton = ({ children, ...props }) => {
  const styles = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={styles.root}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
