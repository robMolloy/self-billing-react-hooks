import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiModal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: ".3125em",
    padding: "1.25em",
    boxShadow: theme.shadows[5],
  },
}));

const Modal = ({ open, onClose, children }) => {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => setOpen(true);
  // const onClose = () => setOpen(false);

  return (
    <MuiModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      {...{ open, onClose }}
    >
      <Fade in={open}>
        <div className={classes.paper}>{children}</div>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
