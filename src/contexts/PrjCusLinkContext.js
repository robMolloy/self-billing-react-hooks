import React, { createContext, useReducer, useEffect } from "react";
import { PrjCusLinkReducer } from "../reducers/PrjCusLinkReducer";
import mightyStorage from "../user_modules/mightyStorage";

export const PrjCusLinkContext = createContext();

const RecItemContextProvider = (props) => {
  const [prjCusLinks, dispatch] = useReducer(
    PrjCusLinkReducer,
    mightyStorage.getItem("sb_prj_cus_links", {})
  );

  useEffect(() => {
    mightyStorage.setItem("sb_prj_cus_links", prjCusLinks);
  }, [prjCusLinks]);

  return (
    <PrjCusLinkContext.Provider value={{ prjCusLinks, dispatch }}>
      {props.children}
    </PrjCusLinkContext.Provider>
  );
};

export default RecItemContextProvider;
