import React, { useContext, createContext } from "react";
import { CustomerContext } from "./CustomerContext";
import { ProjectContext } from "./ProjectContext";
import { PrjCusLinkContext } from "./PrjCusLinkContext";

export const CustomersOnProjectContext = createContext();

const CustomersOnProjectContextProvider = (props) => {
  const { objects: projects } = useContext(ProjectContext);
  const { customers } = useContext(CustomerContext);
  const { objects: prjCusLinks } = useContext(PrjCusLinkContext);
  const projectArray = Object.values(projects);
  const prjCusLinksArray = Object.values(prjCusLinks);

  const customersOnProjects = {};

  projectArray.forEach((project) => (customersOnProjects[project.id] = []));

  prjCusLinksArray.forEach((prjCusLink) => {
    const customer = customers[prjCusLink.pcl_cus_id];
    const customersOnProject = customersOnProjects[prjCusLink.pcl_prj_id];

    if (Array.isArray(customersOnProject)) customersOnProject.push(customer);
  });

  return (
    <CustomersOnProjectContext.Provider value={{ customersOnProjects }}>
      {props.children}
    </CustomersOnProjectContext.Provider>
  );
};

export default CustomersOnProjectContextProvider;
