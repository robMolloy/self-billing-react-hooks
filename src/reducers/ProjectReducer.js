import { v4 as uuid } from "uuid";

export const ProjectReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PROJECT":
      const id = action.project.id === undefined ? uuid() : action.project.id;
      return { ...state, [id]: action.project };

    case "REMOVE_PROJECT":
      delete state[action.id];
      return { ...state };

    default:
      return { ...state };
  }
};
