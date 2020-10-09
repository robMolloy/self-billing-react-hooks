import React from "react";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import ProjectContextProvider from "../../contexts/ProjectContext";
import CustomerContextProvider from "../../contexts/CustomerContext";
import PrjCusLinkContextProvider from "../../contexts/PrjCusLinkContext";
import CustomersOnProjectContextProvider from "../../contexts/CustomersOnProjectContext";

const ProjectPage = () => {
  return (
    <CustomerContextProvider>
      <ProjectContextProvider>
        <PrjCusLinkContextProvider>
          <CustomersOnProjectContextProvider>
            <ProjectForm />
            <ProjectList />
          </CustomersOnProjectContextProvider>
        </PrjCusLinkContextProvider>
      </ProjectContextProvider>
    </CustomerContextProvider>
  );
};

export default ProjectPage;
