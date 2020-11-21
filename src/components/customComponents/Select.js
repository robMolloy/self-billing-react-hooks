import React, { forwardRef } from "react";
import MUISelect from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";

import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => {
  return {
    formControl: { width: "100%" },
    label: {
      backgroundColor: "#FFFFFF",
      padding: "2px 5px",
      marginLeft: "-4px",
    },
    helperText: { color: theme.palette.error.main },
  };
});

const Select = forwardRef((props, ref) => {
  let id, variant, option1, children, name, label, helperText;

  ({
    id = uuid(),
    variant = "outlined",
    option1 = <option value={""}>Select...</option>,
    children,
    name,
    label,
    helperText,
    ...props
  } = props);

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant={variant}>
      <InputLabel htmlFor={id} className={classes.label}>
        {label}
      </InputLabel>
      <MUISelect native ref={ref} inputProps={{ name, id }} {...props}>
        {option1}
        {children}
      </MUISelect>
      <FormHelperText className={classes.helperText}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
});

export default Select;
