import React from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MUISelect from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuid } from "uuid/dist";

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

function App() {
  // const classes = useStyles();
  return (
    <div className="App" style={{ width: "100%", maxWidth: "480px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          hi
        </Grid>
        <Grid item xs={6}>
          <TextField label="Age" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <Select label="Age">
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </Grid>
        <Grid item xs={12}>
          hi
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
