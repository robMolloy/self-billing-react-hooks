import React from "react";
import MUISelect from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
  formControl: { width: "100%" },
  label: { backgroundColor: "#FFFFFF", padding: "2px 5px", marginLeft: "-4px" },
}));

const Select = ({ children, name, id, variant, label, ...props }) => {
  id = id ? id : uuid();
  variant = variant === undefined ? "outlined" : variant;

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant={variant}>
      <InputLabel htmlFor={id} className={classes.label}>
        {label}
      </InputLabel>
      <MUISelect native inputProps={{ name, id }} {...props}>
        {children}
      </MUISelect>
    </FormControl>
  );
};

export default Select;
