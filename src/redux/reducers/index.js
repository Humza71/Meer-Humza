import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";

import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import messageReducer from "./messageReducer";
import uiReducer from "./uiReducer";

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    authReducer,
    themeReducer,
    messageReducer,
    uiReducer,
  });

export default reducers;
