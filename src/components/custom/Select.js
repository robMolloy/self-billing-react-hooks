import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { v4 as uuid } from "uuid";

const CustomSelect = ({ children, label, id, ...props }) => {
  id = id === undefined ? uuid() : id;
  const labelId = uuid();

  console.log(label);

  return (
    <FormControl style={{ width: "100%" }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select margin="dense" labelId={labelId} {...props}>
        {children}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
