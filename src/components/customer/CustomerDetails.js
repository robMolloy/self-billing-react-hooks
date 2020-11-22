import React from "react";

import Accordian from "../customComponents/Accordian";
import GridContainer from "../customComponents/GridContainer";
import GridItem from "../customComponents/GridItem";

import DeleteIcon from "../customIcons/DeleteIcon";
import EditIcon from "../customIcons/EditIcon";
import ContactIcon from "../customIcons/ContactIcon";

import Typography from "@material-ui/core/Typography";
import useCustomerReducer from "../../custom_hooks/useCustomerContext";

import ContactDetailsList from "../contact/ContactDetailsList";

const CustomerDetails = (props) => {
  let customer, contacts, setModalCustomer, setModalContacts;
  ({ customer, contacts, setModalCustomer, setModalContacts } = props);

  const customerRow = Object.values(customer)[0];

  const { removeCustomerDialogue } = useCustomerReducer();

  return (
    <Accordian
      summary={
        <>
          <Typography style={{ flex: 1 }}>
            {customerRow.cus_first_name} {customerRow.cus_last_name}
          </Typography>
          <Typography>{Object.values(contacts).length}</Typography>
          <ContactIcon />
        </>
      }
    >
      <GridContainer>
        <ContactDetailsList {...{ contacts }} />
        {/* {contactRowArray.map((contactRow) => (
        ))} */}
        <GridItem xs={10}></GridItem>
        <GridItem xs={1}>
          <EditIcon
            onClick={() => {
              setModalCustomer(customer);
              setModalContacts(contacts);
            }}
          />
        </GridItem>
        <GridItem xs={1}>
          <DeleteIcon onClick={() => removeCustomerDialogue(customerRow.id)} />
        </GridItem>
      </GridContainer>
    </Accordian>
  );
};

export default CustomerDetails;
