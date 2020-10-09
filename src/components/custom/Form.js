import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

const Form = ({ children, ...props }) => {
  const styles = useStyles();

  return (
    <form noValidate {...props} className={styles.root}>
      {children}
    </form>
  );
};

export default Form;
