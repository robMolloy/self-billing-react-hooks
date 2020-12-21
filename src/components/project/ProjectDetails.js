import React from "react";
// import { ProjectContext } from "../../contexts/ProjectContext";

import Accordian from "../customComponents/Accordian";
import GridContainer from "../customComponents/GridContainer";
import GridItem from "../customComponents/GridItem";

import EditIcon from "../customIcons/EditIcon";
import DeleteIcon from "../customIcons/DeleteIcon";
import CustomerIcon from "../customIcons/CustomerIcon";

import Typography from "@material-ui/core/Typography";

import CustomerDisplayLineList from "../customer/CustomerDisplayLineList";

import useProjectContext from "../../custom_hooks/useProjectContext";

const ProjectDetails = ({ project, customers }) => {
  // const { dispatch } = useContext(ProjectContext);

  // const { remove: removeProject } = useProjectContext();
  const upcRtn = useProjectContext();
  console.log(upcRtn);
  const { remove: removeProject } = upcRtn;
  const projectRow = Object.values(project)[0];

  return (
    <Accordian
      summary={
        <>
          <Typography style={{ flex: 1 }}>
            {`${projectRow.prj_address_1} (${projectRow.prj_acronym})`}
          </Typography>
          <Typography>{Object.values(customers).length}</Typography>
          <CustomerIcon />
        </>
      }
    >
      <GridContainer>
        <CustomerDisplayLineList {...{ customers }} />
        <GridItem xs={10}></GridItem>
        <GridItem xs={1}>
          <EditIcon
          // onClick={() => {
          //   setModalCustomer(customer);
          //   setModalContacts(contacts);
          // }}
          />
        </GridItem>
        <GridItem xs={1}>
          <DeleteIcon onClick={() => removeProject(projectRow.id)} />
        </GridItem>
      </GridContainer>
    </Accordian>
  );

  // return (
  //   <div
  //     className="panel"
  //     onClick={() => dispatch({ type: "REMOVE_PROJECT", id })}
  //   >
  //     {prj_acronym}: {prj_address_1}, {prj_city}, {prj_postcode}
  //     {customers.map((customer) => (
  //       <div key={customer.id} className="jc">
  //         {customer.cus_first_name} {customer.cus_last_name}
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default ProjectDetails;
