import React from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";

import GridSelect from "./components/custom/GridSelect";
import GridInput from "./components/custom/GridInput";

function App() {
  // const classes = useStyles();
  return (
    <div className="App" style={{ width: "100%", maxWidth: "480px" }}>
      <Grid container spacing={2}>
        <GridInput grid={{ xs: 6 }} label="Age" variant="outlined" fullWidth />
        <GridSelect grid={{ xs: 6 }} label="Age">
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </GridSelect>
      </Grid>
    </div>
  );
}

export default App;
