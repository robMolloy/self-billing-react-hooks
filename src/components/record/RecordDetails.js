import React, { useContext } from "react";
import { RecordContext } from "../../contexts/RecordContext";

const RecordDetails = ({ record }) => {
  const { dispatch } = useContext(RecordContext);

  return (
    <div
      className="panel"
      onClick={() => dispatch({ type: "REMOVE_RECORD", id: record.id })}
    >
      <div className="jc">
        <div>{record.rec_id}</div>
        <div>{record.rec_usr_id}</div>
        <div>{record.rec_prj_id}</div>
        <div>{record.rec_description}</div>
        <div>{record.rec_timestamp_planned_start}</div>
        <div>{record.rec_timestamp_planned_finish}</div>
        <div>{record.rec_timestamp_completed}</div>
        <div>{record.rec_timestamp_paid}</div>
        <div>{record.rec_total}</div>
        <div>{record.rec_duration_qty}</div>
        <div>{record.rec_duration_unit}</div>
      </div>
    </div>
  );
};

export default RecordDetails;
