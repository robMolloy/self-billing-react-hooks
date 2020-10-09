import React, { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";

const ProjectDetails = ({ project, customers }) => {
  const { dispatch } = useContext(ProjectContext);

  const { id, prj_acronym, prj_address_1, prj_city, prj_postcode } = project;

  return (
    <div
      className="panel"
      onClick={() => dispatch({ type: "REMOVE_PROJECT", id })}
    >
      {prj_acronym}: {prj_address_1}, {prj_city}, {prj_postcode}
      {customers.map((customer) => (
        <div key={customer.id} className="jc">
          {customer.cus_first_name} {customer.cus_last_name}
        </div>
      ))}
    </div>
  );
};

export default ProjectDetails;
