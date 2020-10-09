import React from "react";
import { Receipt, Person } from "@material-ui/icons/";

export default [
  {
    to: "/contacts",
    icon: <Person />,
    label: "Contacts",
  },
  {
    to: "/customers",
    icon: <Person />,
    label: "Customers",
  },
  {
    to: "/prjCusLinks",
    icon: <Person />,
    label: "prj cus links",
  },
  {
    to: "/projects",
    icon: <Person />,
    label: "Projects",
  },
  {
    to: "/recItems",
    icon: <Person />,
    label: "Rec items",
  },
  {
    to: "/records",
    icon: <Receipt />,
    label: "Records",
  },
];
