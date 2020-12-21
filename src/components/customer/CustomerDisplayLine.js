import React from "react";
import GridItem from "../customComponents/GridItem";

const CustomerDisplayLine = ({ customer }) => {
  const customerRow = Object.values(customer)[0];

  return (
    <>
      <GridItem>
        {`${customerRow.cus_first_name} ${customerRow.cus_last_name}`}
      </GridItem>
    </>
  );
};

export default CustomerDisplayLine;
