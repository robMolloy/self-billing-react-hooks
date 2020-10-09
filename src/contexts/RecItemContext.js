import React, { createContext, useReducer, useEffect } from "react";
import { RecItemReducer } from "../reducers/RecItemReducer";
import mightyStorage from "../user_modules/mightyStorage";

export const RecItemContext = createContext();

const RecItemContextProvider = (props) => {
  const [recItems, dispatch] = useReducer(
    RecItemReducer,
    mightyStorage.getItem("sb_rec_items", {})
  );

  useEffect(() => {
    mightyStorage.setItem("sb_rec_items", recItems);
  }, [recItems]);

  return (
    <RecItemContext.Provider value={{ recItems, dispatch }}>
      {props.children}
    </RecItemContext.Provider>
  );
};

export default RecItemContextProvider;
