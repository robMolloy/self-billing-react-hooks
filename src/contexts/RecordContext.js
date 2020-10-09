import React, { createContext, useReducer, useEffect } from "react";
import { RecordReducer } from "../reducers/RecordReducer";
import mightyStorage from "../user_modules/mightyStorage";

export const RecordContext = createContext();

const RecordContextProvider = (props) => {
  const [records, dispatch] = useReducer(
    RecordReducer,
    mightyStorage.getItem("sb_records", {})
  );

  useEffect(() => {
    mightyStorage.setItem("sb_records", records);
  }, [records]);

  return (
    <RecordContext.Provider value={{ records, dispatch }}>
      {props.children}
    </RecordContext.Provider>
  );
};

export default RecordContextProvider;
