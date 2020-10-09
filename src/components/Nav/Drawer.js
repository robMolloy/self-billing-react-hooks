import React from "react";
import { Drawer as MUIDrawer, List } from "@material-ui/core";
import navItems from "./navItems";
import DrawerTab from "./DrawerTab";
import { v4 as uuid } from "uuid";

const Drawer = (props) => {
  return (
    <MUIDrawer anchor={"left"} open={props.open} onClose={props.toggleDrawer}>
      <List>
        {navItems.map((item, index) => (
          <DrawerTab key={uuid()} {...item} />
        ))}
      </List>
    </MUIDrawer>
  );
};

export default Drawer;
