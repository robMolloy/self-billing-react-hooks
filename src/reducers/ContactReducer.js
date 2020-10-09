import { v4 as uuid } from "uuid";

export const ContactReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      if (action.contact.id === undefined) action.contact.id = uuid();
      const { id } = action.contact;

      return { ...state, [id]: action.contact };

    case "REMOVE_CONTACT":
      delete state[action.id];
      return { ...state };

    default:
      return { ...state };
  }
};
