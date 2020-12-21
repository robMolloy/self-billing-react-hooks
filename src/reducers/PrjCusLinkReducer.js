const PrjCusLinkReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, ...action.objects };

    case "REMOVE":
      delete state[action.id];
      return { ...state };

    default:
      return { ...state };
  }
};

export default PrjCusLinkReducer;
