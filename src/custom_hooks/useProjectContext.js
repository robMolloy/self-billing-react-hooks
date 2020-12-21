import React from "react";
import { ProjectContext } from "../contexts/ProjectContext";
// import { PrjCusLinksOnProjectContext } from "../contexts/PrjCusLinksOnProjectContext";
import usePrjCusLinkContext from "./usePrjCusLinkContext";
// import Swal from "sweetalert2";
import { v4 as uuid } from "uuid";

const useProjectContext = () => {
  const projectContextReturn = React.useContext(ProjectContext);
  const { dispatch, objects: projects } = projectContextReturn;

  const {
    remove: removePrjCusLink,
    objects: prjCusLinks,
  } = usePrjCusLinkContext();

  const add = (object) => {
    object.id = object.id === undefined ? uuid() : object.id;

    dispatch({ type: "ADD", object });
    return object;
  };

  const getPrjCusLinksOnProjects = () => {
    const prjCusLinksOnProjects = {};
    console.log(projects);

    Object.entries(projects).forEach(([prj_id, projectRow]) => {
      prjCusLinksOnProjects[prj_id] = {};
    });

    Object.entries(prjCusLinks).forEach(([pcl_id, prjCusLinkRow]) => {
      const prj_id = prjCusLinkRow.prj_cus_link_prj_id;
      prjCusLinksOnProjects[prj_id][pcl_id] = prjCusLinkRow;
    });

    return prjCusLinksOnProjects;
  };

  // const prjcuslinksOnProjectContextReturn = useContext(
  //   PrjCusLinksOnProjectContext
  // );
  // const { prjCusLinksOnProjects } = prjcuslinksOnProjectContextReturn;

  // const { removePrjCusLink } = usePrjCusLinkContext();

  const remove = (id) => {
    const prjCusLinksOnProjects = getPrjCusLinksOnProjects();
    const prjCusLinks = prjCusLinksOnProjects[id];

    Object.values(prjCusLinks).forEach((prjCusLink) =>
      removePrjCusLink(prjCusLink.id)
    );

    dispatch({ type: "REMOVE", id });
  };

  // const removeProjectDialogue = async (id) => {
  //   const swalRtn = await Swal.fire({
  //     icon: "question",
  //     title: "Do you want to delete?",
  //     target: "body",
  //     showCancelButton: true,
  //     confirmButtonText: `Delete`,
  //   });
  //   if (swalRtn.isConfirmed) {
  //     removeProject(id);
  //     Swal.fire("Deleted!", "", "success");
  //   }
  // };

  return {
    ...projectContextReturn,
    // removeProject,
    // removeProjectDialogue,
    add,
    remove,
  };
};

export default useProjectContext;
