import React, { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { PrjCusLinkContext } from "../../contexts/PrjCusLinkContext";
import { CustomerContext } from "../../contexts/CustomerContext";
import { CustomersOnProjectContext } from "../../contexts/CustomersOnProjectContext";
import ProjectDetails from "./ProjectDetails";

const ProjectList = () => {
  let { customersOnProjects } = useContext(CustomersOnProjectContext);
  console.log(customersOnProjects);

  /* */
  const { projects } = useContext(ProjectContext);
  const { customers } = useContext(CustomerContext);
  const { prjCusLinks } = useContext(PrjCusLinkContext);

  customersOnProjects = {};
  Object.values(projects).forEach(
    (project) => (customersOnProjects[project.id] = [])
  );
  Object.values(prjCusLinks).forEach((prjCusLink) => {
    const customer = customers[prjCusLink.pcl_cus_id];
    customersOnProjects[prjCusLink.pcl_prj_id].push(customer);
  });

  /* */

  console.log(customersOnProjects);
  return Object.values(projects).map((project) => (
    <ProjectDetails
      key={project.id}
      project={project}
      customers={customersOnProjects[project.id]}
    />
  ));
};

export default ProjectList;
