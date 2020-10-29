import React from "react";

import Accordian from "../customComponents/Accordian";
import GridContainer from "../customComponents/GridContainer";
import GridItem from "../customComponents/GridItem";

import DeleteIcon from "../customIcons/DeleteIcon";
import EditIcon from "../customIcons/EditIcon";
import ContactIcon from "../customIcons/ContactIcon";

import Typography from "@material-ui/core/Typography";
import useCustomerReducer from "../../custom_hooks/useCustomerContext";

const CustomerDetails = ({
  customer,
  customerContacts,
  setModalCustomer,
  setModalContacts,
}) => {
  const { removeCustomerDialogue } = useCustomerReducer();
  const customerContactsArray = Object.values(customerContacts);

  return (
    <Accordian
      summary={
        <>
          <Typography style={{ flex: 1 }}>
            {customer.cus_first_name} {customer.cus_last_name}
          </Typography>
          <Typography>{customerContactsArray.length}</Typography>
          <ContactIcon />
        </>
      }
    >
      <GridContainer>
        {customerContactsArray.map((contact) => (
          <React.Fragment key={contact.id}>
            <GridItem xs={3}>{contact.con_type} </GridItem>
            <GridItem xs={3}>{contact.con_method}</GridItem>
            <GridItem xs={4}>{contact.con_address}</GridItem>
            <GridItem xs={2}></GridItem>
          </React.Fragment>
        ))}
        <GridItem xs={10}></GridItem>
        <GridItem xs={1}>
          <EditIcon
            onClick={() => {
              setModalCustomer(customer);
              setModalContacts(customerContacts);
            }}
          />
        </GridItem>
        <GridItem xs={1}>
          <DeleteIcon onClick={() => removeCustomerDialogue(customer.id)} />
        </GridItem>
      </GridContainer>
    </Accordian>
  );
};

export default CustomerDetails;
