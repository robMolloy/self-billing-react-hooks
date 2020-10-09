import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const MainContainer = ({ children, ...props }) => {
  const styles = useStyles();

  return (
    <Container
      component="main"
      maxWidth="xs"
      {...props}
      className={styles.root}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
