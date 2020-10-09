import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    button: {
      alignSelf: "stretch",
      padding: "0",
    },
    format: { alignSelf: "stretch" },
    link: {
      padding: theme.spacing(2),
      alignSelf: "stretch",
      textTransform: "none",
      textDecoration: "none",
      color: theme.palette.primary.contrastText,
      whiteSpace: "nowrap",
    },
  };
});

const NavTab = (props) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <Button className={classes.button}>
      <Link className={classes.link} to={props.to}>
        <Typography variant="subtitle1">{children}</Typography>
      </Link>
    </Button>
  );
};

export default NavTab;
