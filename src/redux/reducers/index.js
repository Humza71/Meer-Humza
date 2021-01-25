// import { combineReducers } from "redux";

// import themeReducer from "./themeReducer";
// import authReducer from "./authReducer";

// export const rootReducer = combineReducers({
//   themeReducer,
//   authReducer,
// });

import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";

import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import messageReducer from "./messageReducer";

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    authReducer,
    themeReducer,
    messageReducer,
  });

export default reducers;
