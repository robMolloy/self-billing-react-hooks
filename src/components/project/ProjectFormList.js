import React from "react";
import { v4 as uuid } from "uuid";
import FormListItem from "./ProjectFormListItem";
import FormBody from "./ProjectFormBody";

const ProjectFormList = (props) => {
  let state, setState, values, type;
  ({ state, setState, values = {}, type = "listItem" } = props);

  let Component = type === "listItem" ? FormListItem : FormBody;

  return Object.entries(values).map(([id, object]) => {
    const key = uuid();

    return <Component {...{ key, state, setState, values: object }} />;
  });
};

export default ProjectFormList;
