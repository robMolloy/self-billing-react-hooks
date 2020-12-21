import React from "react";
import ProjectDisplayLine from "./ProjectDisplayLine";
import { v4 as uuid } from "uuid";

const ProjectDisplayLineList = ({ projects }) => {
  return Object.entries(projects).map(([id, projectRow]) => (
    <ProjectDisplayLine key={uuid()} project={{ [id]: projectRow }} />
  ));
};

export default ProjectDisplayLineList;
