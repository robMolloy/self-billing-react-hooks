import React, { useContext } from "react";
import { PrjCusLinkContext } from "../../contexts/PrjCusLinkContext";

const PrjCusLinkDetails = ({ prjCusLink, customer, project }) => {
  const { dispatch } = useContext(PrjCusLinkContext);
  return (
    <div
      className="panel"
      onClick={() => dispatch({ type: "REMOVE_PRJCUSLINK", id: prjCusLink.id })}
    >
      <div className="jc">
        {project.prj_acronym}: {customer.cus_first_name}{" "}
        {customer.cus_last_name}
      </div>
    </div>
  );
};

export default PrjCusLinkDetails;
