import { v4 as uuid } from "uuid";

export const CustomerReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CUSTOMER":
      const { cus_first_name, cus_last_name } = action.customer;
      const id = action.customer.id === undefined ? uuid() : action.customer.id;

      return { ...state, [id]: { id, cus_first_name, cus_last_name } };

    case "REMOVE_CUSTOMER":
      const customerId = action.id;
      delete state[customerId];
      return { ...state };

    default:
      return { ...state };
  }
};
