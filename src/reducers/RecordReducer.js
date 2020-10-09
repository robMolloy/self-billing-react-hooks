import { v4 as uuid } from "uuid";

export const RecordReducer = (state, action) => {
  switch (action.type) {
    case "ADD_RECORD":
      const id = action.record.id === undefined ? uuid() : action.record.id;
      return { ...state, [id]: action.record };

    case "REMOVE_RECORD":
      delete state[action.id];
      return { ...state };

    default:
      return { ...state };
  }
};
