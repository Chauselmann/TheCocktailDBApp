export default function loader(state, action) {
  switch (action.type) {
    case "LOAD":
      return {
        ...state,
        loading: action.value
      };
    default:
      return state;
  }
}
