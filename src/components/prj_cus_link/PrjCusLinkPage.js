import React from "react";
import PrjCusLinkForm from "./PrjCusLinkForm";
import PrjCusLinkList from "./PrjCusLinkList";
import CustomerContextProvider from "../../contexts/CustomerContext";
import ProjectContextProvider from "../../contexts/ProjectContext";
import PrjCusLinkContextProvider from "../../contexts/PrjCusLinkContext";

const PrjCusLinkPage = () => {
  return (
    <ProjectContextProvider>
      <CustomerContextProvider>
        <PrjCusLinkContextProvider>
          <PrjCusLinkForm />
          <PrjCusLinkList />
        </PrjCusLinkContextProvider>
      </CustomerContextProvider>
    </ProjectContextProvider>
  );
};

export default PrjCusLinkPage;
