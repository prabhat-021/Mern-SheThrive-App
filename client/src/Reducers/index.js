import { combineReducers } from "redux";

import { postReducer } from "./postReducer.js";
import { authReducer } from "./auth.js";

export default combineReducers({
    postReducer, authReducer
});