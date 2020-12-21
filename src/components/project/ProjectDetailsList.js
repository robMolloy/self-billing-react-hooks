import React, { useContext } from "react";

import { ProjectContext } from "../../contexts/ProjectContext";
import { PrjCusLinkContext } from "../../contexts/PrjCusLinkContext";
import { CustomerContext } from "../../contexts/CustomerContext";
import { CustomersOnProjectContext } from "../../contexts/CustomersOnProjectContext";

import ProjectDetails from "./ProjectDetails";

import MainContainer from "../customComponents/MainContainer";

const ProjectDetailsList = () => {
  let { customersOnProjects } = useContext(CustomersOnProjectContext);

  const { objects: projects } = useContext(ProjectContext);
  const { customers } = useContext(CustomerContext);
  const { objects: prjCusLinks } = useContext(PrjCusLinkContext);

  customersOnProjects = {};
  Object.values(projects).forEach(
    (project) => (customersOnProjects[project.id] = {})
  );
  Object.values(prjCusLinks).forEach((prjCusLink) => {
    const customer = customers[prjCusLink.prj_cus_link_cus_id];
    customersOnProjects[prjCusLink.pcl_prj_id][customer.id] = customer;
  });

  return (
    <>
      <MainContainer>
        {Object.values(projects).map((projectRow) => (
          <ProjectDetails
            key={projectRow.id}
            project={{ [projectRow.id]: projectRow }}
            customers={customersOnProjects[projectRow.id]}
          />
        ))}
      </MainContainer>
    </>
  );
};

export default ProjectDetailsList;
