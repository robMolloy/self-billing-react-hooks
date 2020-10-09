import React, { useContext, createContext } from "react";
import { CustomerContext } from "./CustomerContext";
import { ProjectContext } from "./ProjectContext";
import { PrjCusLinkContext } from "./PrjCusLinkContext";

export const CustomersOnProjectContext = createContext();

const CustomersOnProjectContextProvider = (props) => {
  const { projects } = useContext(ProjectContext);
  const { customers } = useContext(CustomerContext);
  const { prjCusLinks } = useContext(PrjCusLinkContext);

  const customersOnProjects = {};
  Object.values(projects).forEach(
    (project) => (customersOnProjects[project.id] = [])
  );
  Object.values(prjCusLinks).forEach((prjCusLink) => {
    const customer = customers[prjCusLink.pcl_cus_id];
    customersOnProjects[prjCusLink.pcl_prj_id].push(customer);
  });

  return (
    <CustomersOnProjectContext.Provider value={{ customersOnProjects }}>
      {props.children}
    </CustomersOnProjectContext.Provider>
  );
};

export default CustomersOnProjectContextProvider;
