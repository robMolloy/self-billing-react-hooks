import React, { createContext, useReducer, useEffect } from "react";
import ProjectReducer from "../reducers/ProjectReducer";
import mightyStorage from "../user_modules/mightyStorage";

export const ProjectContext = createContext();

const ProjectContextProvider = (props) => {
  const objectType = "projects";
  const [objects, dispatch] = useReducer(
    ProjectReducer,
    mightyStorage.getItem(`sb_${objectType}`, {})
  );

  useEffect(() => {
    mightyStorage.setItem(`sb_${objectType}`, objects);
  }, [objects]);

  return (
    <ProjectContext.Provider value={{ objects, dispatch }}>
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
