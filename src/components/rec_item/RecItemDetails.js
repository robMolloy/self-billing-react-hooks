import React, { useContext } from "react";
import { RecItemContext } from "../../contexts/RecItemContext";

const RecItemDetails = ({ recItem }) => {
  const { dispatch } = useContext(RecItemContext);

  return (
    <div
      className="panel"
      onClick={() => dispatch({ type: "REMOVE_RECITEM", id: recItem.id })}
    >
      <div className="jc">
        <div>{recItem.rci_id}</div>
        <div>{recItem.rci_usr_id}</div>
        <div>{recItem.rci_rec_id}</div>
        <div>{recItem.rci_work}</div>
        <div>{recItem.rci_unit}</div>
        <div>{recItem.rci_qty}</div>
        <div>{recItem.rci_cost_per_unit}</div>
        <div>{recItem.rci_total}</div>
      </div>
    </div>
  );
};

export default RecItemDetails;
