import React from "react";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";

const DrawerTab = (props) => {
  return (
    <ListItem button key={props.label}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.label} />
    </ListItem>
  );
};

export default DrawerTab;
