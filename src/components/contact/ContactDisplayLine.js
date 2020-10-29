import React from "react";

const ContactDisplayLine = () => {
  return (
    <React.Fragment key={uuid()}>
      <GridItem xs={3}>{contact.con_type}</GridItem>
      <GridItem xs={3}>{contact.con_method}</GridItem>
      <GridItem xs={4}>{contact.con_address}</GridItem>
      <GridItem xs={1} onClick={() => editContactFromStateInForm(contact)}>
        <EditIcon />
      </GridItem>
      <GridItem xs={1} onClick={() => deleteContactFromState(contact.id)}>
        <DeleteIcon />
      </GridItem>
    </React.Fragment>
  );
};

export default ContactDisplayLine;
