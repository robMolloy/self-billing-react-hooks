import React from "react";
import Modal from "react-modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    modal: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
});

const Modal = ({ isOpen = false, setIsOpen, children }) => {
  const classes = useStyles();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <Modal
      {...{ isOpen }}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Example Modal"
      className={classes.modal}
    >
      {children}
    </Modal>
  );
};

export default Modal;
