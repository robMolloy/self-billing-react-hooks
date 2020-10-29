import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import primary from "@material-ui/core/colors/indigo";
import secondary from "@material-ui/core/colors/orange";
import danger from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: { primary, secondary },
  status: { danger },
  headerHeight: "60px",
});

export default theme;
