import { createMuiTheme } from "@material-ui/core/styles";
import { blue, orange, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: { primary: blue, secondary: orange, contrast: { main: "#ffffff" } },
  status: { danger: red },
  headerHeight: "48px",
});

export default theme;
