import { combineReducers } from "redux";
import tokens from "./authenticationReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
    tokens,
    apiCallsInProgress
});

export default rootReducer;
