import { createStore } from "redux";
import myReducer from "../reducers/index";

var store = createStore(myReducer);

export default store;