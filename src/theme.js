import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import primary from "@material-ui/core/colors/deepOrange";
import secondary from "@material-ui/core/colors/blue";
import danger from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: { primary, secondary },
  status: { danger },
  headerHeight: "60px",
});

export default theme;
