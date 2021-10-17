import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import member from "./reducers/member";

const reducer = combineReducers({
  member,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

window.store = store;
export default store;
