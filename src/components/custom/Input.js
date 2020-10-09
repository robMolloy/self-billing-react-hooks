import TextField from "@material-ui/core/TextField";
import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return <TextField variant="outlined" inputRef={ref} fullWidth {...props} />;
});

export default Input;
