import React from "react";
import RecItemForm from "./RecItemForm";
import RecItemList from "./RecItemList";
import RecItemContextProvider from "../../contexts/RecItemContext";
import RecordContextProvider from "../../contexts/RecordContext";

const RecItemPage = () => {
  return (
    <RecordContextProvider>
      <RecItemContextProvider>
        <RecItemForm />
        <RecItemList />
      </RecItemContextProvider>
    </RecordContextProvider>
  );
};

export default RecItemPage;
