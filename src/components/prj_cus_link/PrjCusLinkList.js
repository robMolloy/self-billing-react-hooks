import React, { useContext } from "react";
import { PrjCusLinkContext } from "../../contexts/PrjCusLinkContext";
import PrjCusLinkDetails from "./PrjCusLinkDetails";

import { CustomerContext } from "../../contexts/CustomerContext";
import { ProjectContext } from "../../contexts/ProjectContext";

const PrjCusLinkList = () => {
  const { prjCusLinks } = useContext(PrjCusLinkContext);
  const { customers } = useContext(CustomerContext);
  const { projects } = useContext(ProjectContext);

  const customersOnProjects = {};
  Object.entries(prjCusLinks).forEach((prjCusLinkEntry) => {
    // const prjCusLinkId = prjCusLinkEntry[0];
    const prjCusLink = prjCusLinkEntry[1];

    if (customersOnProjects[prjCusLink.pcl_prj_id] === undefined) {
      customersOnProjects[prjCusLink.pcl_prj_id] = [];
    }
    customersOnProjects[prjCusLink.pcl_prj_id].push(prjCusLink.pcl_cus_id);
  });

  return Object.values(prjCusLinks).map((prjCusLink) => {
    const { id, pcl_cus_id, pcl_prj_id } = prjCusLink;
    return (
      <PrjCusLinkDetails
        key={id}
        prjCusLink={prjCusLink}
        customer={customers[pcl_cus_id]}
        project={projects[pcl_prj_id]}
      />
    );
  });
};

export default PrjCusLinkList;
