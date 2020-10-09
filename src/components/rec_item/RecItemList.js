import React, { useContext } from "react";
import { RecItemContext } from "../../contexts/RecItemContext";
import RecItemDetails from "./RecItemDetails";

const RecItemList = () => {
  const { recItems } = useContext(RecItemContext);
  const recItemArray = Object.values(recItems);

  return recItemArray.map((recItem) => (
    <RecItemDetails key={recItem.id} recItem={recItem} />
  ));
};

export default RecItemList;
