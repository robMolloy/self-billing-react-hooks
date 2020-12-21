import { useContext } from "react";
import { PrjCusLinkContext } from "../contexts/PrjCusLinkContext";

const usePrjCusLinkContext = (id) => {
  const prjCusLinkContextReturn = useContext(PrjCusLinkContext);
  const { dispatch } = prjCusLinkContextReturn;

  const remove = (id) => dispatch({ type: "REMOVE", id });
  const add = (objects) => dispatch({ type: "ADD", objects });

  // const addPrjCusLinks = ({ prjcuslinks, pcl_id }) => {
  //   Object.entries(prjcuslinks).forEach(([id, prjcuslink]) => {
  //     pcl_id = pcl_id === undefined ? prjcuslink.pcl_id : pcl_id;
  //      prjcuslink.con_pcl_id = pcl_id;
  //     addPrjCusLink(prjcuslink);
  //   });
  // };
  return {
    ...prjCusLinkContextReturn,
    remove,
    add,
    // addPrjCusLinks,
  };
};

export default usePrjCusLinkContext;
