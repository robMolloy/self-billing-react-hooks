import React, { useState } from "react";
import NavTab from "./NavTab";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "./Drawer";
import navItems from "./navItems";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles(({ headerHeight, ...theme }) => {
  headerHeight = headerHeight === undefined ? "60px" : headerHeight;

  return {
    root: { flexGrow: 1 },
    toolbar: { maxHeight: headerHeight },
    menuButton: { marginRight: theme.spacing(2) },
    title: { flexGrow: 1 },
    tabs: { maxHeight: headerHeight },
    placeholder: { maxHeight: headerHeight, minHeight: headerHeight },
  };
});

export default function NavBar() {
  const classes = useStyles();
  const mobileWidth = "sm";

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (e) => setIsDrawerOpen(!isDrawerOpen);

  return (
    <>
      <AppBar color="primary">
        <Toolbar variant="dense" className={classes.toolbar}>
          <Box display={{ xs: "flex", [mobileWidth]: "none" }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={(e) => toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" className={classes.title}>
            SB
          </Typography>
          <Box
            display={{ xs: "none", [mobileWidth]: "flex" }}
            className={classes.tabs}
          >
            {navItems.map((item) => (
              <NavTab key={uuid()} to={item.to}>
                {item.label}
              </NavTab>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <div className={classes.placeholder}></div>
    </>
  );
}
