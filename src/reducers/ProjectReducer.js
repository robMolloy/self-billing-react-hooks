import { v4 as uuid } from "uuid";

const ProjectReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = action.object.id ?? uuid();
      return { ...state, [id]: action.object };

    case "REMOVE":
      delete state[action.id];
      return { ...state };

    default:
      return { ...state };
  }
};

export default ProjectReducer;
