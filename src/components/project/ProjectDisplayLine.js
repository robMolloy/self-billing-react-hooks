import React from "react";
import GridItem from "../customComponents/GridItem";

const ProjectDisplayLine = ({ project }) => {
  const projectRow = Object.values(project)[0];
  return (
    <>
      <GridItem xs={3}>{projectRow.prj_address_1} </GridItem>
      <GridItem xs={3}>{`(${projectRow.prj_acronym})`}</GridItem>
      <GridItem xs={4}></GridItem>
      <GridItem xs={2}></GridItem>
    </>
  );
};

export default ContactDisplayLine;
