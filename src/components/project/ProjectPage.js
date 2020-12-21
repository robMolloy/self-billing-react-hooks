import React from "react";
import ProjectForm from "./ProjectForm";
import ProjectDetailsList from "./ProjectDetailsList";
import ProjectContextProvider from "../../contexts/ProjectContext";
import PrjCusLinkContextProvider from "../../contexts/PrjCusLinkContext";
import CustomerContextProvider from "../../contexts/CustomerContext";
// import PrjCusLinkContextProvider from "../../contexts/PrjCusLinkContext";
import CustomersOnProjectContextProvider from "../../contexts/CustomersOnProjectContext";

const ProjectPage = () => {
  return (
    <CustomerContextProvider>
      <ProjectContextProvider>
        <PrjCusLinkContextProvider>
          <CustomersOnProjectContextProvider>
            <ProjectForm />
            <ProjectDetailsList />
          </CustomersOnProjectContextProvider>
        </PrjCusLinkContextProvider>
      </ProjectContextProvider>
    </CustomerContextProvider>
  );
};

export default ProjectPage;
