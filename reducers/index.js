var initialState = {
  drinks: [],
  drink: {},
  loading: null
};

import cocktailsReducer from "./cocktails";
import loaderReducer from "./loader";

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOAD":
      return loaderReducer(state, action);
    case "SELECT_COCKTAIL":
      return cocktailsReducer(state, action);
    case "SET_COCKTAILS":
      return cocktailsReducer(state, action);
    default:
      return state;
  }
};
