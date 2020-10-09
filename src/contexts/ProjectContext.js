import React, { createContext, useReducer, useEffect } from "react";
import { ProjectReducer } from "../reducers/ProjectReducer";
import mightyStorage from "../user_modules/mightyStorage";

export const ProjectContext = createContext();

const ProjectContextProvider = (props) => {
  const [projects, dispatch] = useReducer(
    ProjectReducer,
    mightyStorage.getItem("sb_projects", {})
  );

  useEffect(() => {
    mightyStorage.setItem("sb_projects", projects);
  }, [projects]);

  return (
    <ProjectContext.Provider value={{ projects, dispatch }}>
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
