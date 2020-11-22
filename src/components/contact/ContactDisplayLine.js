import React from "react";
import GridItem from "../customComponents/GridItem";

const ContactDisplayLine = ({ contact }) => {
  const contactRow = Object.values(contact)[0];
  return (
    <>
      <GridItem xs={3}>{contactRow.con_type} </GridItem>
      <GridItem xs={3}>{contactRow.con_method}</GridItem>
      <GridItem xs={4}>{contactRow.con_address}</GridItem>
      <GridItem xs={2}></GridItem>
    </>
  );
};

export default ContactDisplayLine;
