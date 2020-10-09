import React from "react";
import RecordForm from "./RecordForm";
import RecordList from "./RecordList";
import RecordContextProvider from "../../contexts/RecordContext";
import ProjectContextProvider from "../../contexts/ProjectContext";

const RecordPage = () => {
  return (
    <ProjectContextProvider>
      <RecordContextProvider>
        <RecordForm />
        <RecordList />
      </RecordContextProvider>
    </ProjectContextProvider>
  );
};

export default RecordPage;
