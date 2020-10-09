import { v4 as uuid } from "uuid";

export const RecItemReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_RECITEM":
      const id = action.recItem.id === undefined ? uuid() : action.recItem.id;
      return { ...state, [id]: action.recItem };

    case "REMOVE_RECITEM":
      delete state[action.id];
      return { ...state };

    default:
      return { ...state };
  }
};
