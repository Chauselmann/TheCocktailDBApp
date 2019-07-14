export default function cocktails(state, action) {
  switch (action.type) {
    case "SELECT_COCKTAIL":
      return {
        ...state,
        drink: action.value
      };
    case "SET_COCKTAILS":
      return {
        ...state,
        drinks: action.value
      };
    default:
      return state;
  }
}
