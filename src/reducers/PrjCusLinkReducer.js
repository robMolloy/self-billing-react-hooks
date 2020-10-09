import { v4 as uuid } from "uuid";

export const PrjCusLinkReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRJCUSLINK":
      const id =
        action.prjCusLink.id === undefined ? uuid() : action.prjCusLink.id;
      return { ...state, [id]: action.prjCusLink };

    case "REMOVE_PRJCUSLINK":
      delete state[action.id];
      return { ...state };

    default:
      return { ...state };
  }
};
