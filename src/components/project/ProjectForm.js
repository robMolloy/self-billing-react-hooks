import React from "react";

import Form from "../customComponents/Form";
import MainContainer from "../customComponents/MainContainer";
import GridContainer from "../customComponents/GridContainer";

import FormList from "../generic/FormList";

import { getBlankProjects } from "../../object_info/blankObjects";
import rhfListObject from "../../user_modules/rhfListObject";
// import { ProjectContext } from "../../contexts/ProjectContext";
// import { PrjCusLinkContext } from "../../contexts/PrjCusLinkContext";
import {
  prjCusLinkBlankRow,
  projectBlankRow,
} from "../../object_info/blankRows";

import useProjectContext from "../../custom_hooks/useProjectContext";
import usePrjCusLinkContext from "../../custom_hooks/usePrjCusLinkContext";

import ProjectFormList from "./ProjectFormList";
// import CustomerFormList from "../customer/CustomerFormList";
import PrjCusLinkSelectCustomerForm from "../prj_cus_link/PrjCusLinkSelectCustomerForm";
import GridButton from "../customComponents/GridButton";
import GridItem from "../customComponents/GridItem";

const ProjectForm = (props) => {
  let customers, projects, exists, setModalProject;
  ({
    customers = {},
    projects = getBlankProjects(),
    setModalProject,
    exists = false,
  } = props);

  // let { addCustomersOnProjects } = useCustomersOnProjectsContext();

  let [state, setState] = React.useState({
    customers: { values: customers },
    projects: { values: projects },
  });

  let { add: addProject } = useProjectContext();
  let { add: addPrjCusLinks } = usePrjCusLinkContext();

  let projectList = new rhfListObject({
    defaultValues: { ...projectBlankRow },
    objectType: "projects",
    state,
    setState,
  });

  let prjCusLinkList = new rhfListObject({
    defaultValues: { ...prjCusLinkBlankRow },
    objectType: "prjCusLinks",
    state,
    setState,
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    if (!(await projectList.isValid())) valid = false;
    if (!(await prjCusLinkList.isValid())) valid = false;

    if (valid) {
      let project = Object.values(projectList.getObjects())[0];
      let prjCusLinks = prjCusLinkList.getObjects();

      Object.entries(prjCusLinks).forEach(
        ([id, prjCusLink]) => (prjCusLink.pcl_prj_id = project.id)
      );

      Object.values(prjCusLinks).forEach(
        (prjCusLink) => (prjCusLink.prj_cus_link_prj_id = project.id)
      );

      addProject(project);
      addPrjCusLinks(prjCusLinks);

      setState({});
      if (exists) setModalProject(undefined);
    }
  };

  return (
    <MainContainer>
      <Form onSubmit={(e) => onSubmit(e)}>
        <GridContainer>
          <ProjectFormList
            {...{
              values: state?.projects?.values ?? getBlankProjects(),
              setState,
              state,
              type: "body",
            }}
          />
        </GridContainer>
        <GridContainer>
          <GridItem xs={10} children="Add Customer To Project" />

          <GridButton
            grid={{ xs: 2 }}
            variant="outlined"
            onClick={() => prjCusLinkList.addItem()}
            children="+"
          />

          <FormList
            {...{
              state,
              setState,
              values: state?.prjCusLinks?.values,
              type: "select",
              Component: PrjCusLinkSelectCustomerForm,
            }}
          />

          <GridButton type="submit">Submit</GridButton>
        </GridContainer>
      </Form>
    </MainContainer>
  );
};

export default ProjectForm;
