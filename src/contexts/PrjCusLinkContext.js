// import React from "react";

// import mightyStorage from "../user_modules/mightyStorage";
// console.log(123);
/* 
export const PrjCusLinkContext = React.createContext();

const PrjCusLinkContextProvider = (props) => {
  const [prjCusLinks, dispatch] = React.useReducer(
    PrjCusLinkReducer,
    mightyStorage.getItem("sb_prj_cus_links", {})
  );

  React.useEffect(() => {
    mightyStorage.setItem("sb_prj_cus_links", prjCusLinks);
  }, [prjCusLinks]);
  
  console.log(dispatch);

  return (
    <PrjCusLinkContext.Provider value={{ prjCusLinks, dispatch }}>
      {props.children}
    </PrjCusLinkContext.Provider>
    );
};

export default PrjCusLinkContextProvider;
 */

import React from "react";
// import ProjectReducer from "../reducers/ProjectReducer";
import Reducer from "../reducers/PrjCusLinkReducer";
import mightyStorage from "../user_modules/mightyStorage";

export const PrjCusLinkContext = React.createContext();

const PrjCusLinkContextProvider = (props) => {
  let objectType;
  ({ objectType = "prj_cus_links" } = props);

  const [objects, dispatch] = React.useReducer(
    Reducer,
    mightyStorage.getItem(`sb_${objectType}`, {})
  );

  React.useEffect(() => {
    mightyStorage.setItem(`sb_${objectType}`, objects);

    // eslint-disable-next-line
  }, [objects]);

  return (
    <PrjCusLinkContext.Provider value={{ objects, dispatch }}>
      {props.children}
    </PrjCusLinkContext.Provider>
  );
};

export default PrjCusLinkContextProvider;
