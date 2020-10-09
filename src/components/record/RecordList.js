import React, { useContext } from "react";
import { RecordContext } from "../../contexts/RecordContext";
import RecordDetails from "./RecordDetails";

const RecordList = () => {
  const { records } = useContext(RecordContext);
  const recordArray = Object.values(records);

  return recordArray.map((record) => (
    <RecordDetails key={record.id} record={record} />
  ));
};

export default RecordList;
