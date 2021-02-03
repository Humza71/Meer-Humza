import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";

import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import messageReducer from "./messageReducer";
import uiReducer from "./uiReducer";
import reportReducer from "./reportReducer";

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    authReducer,
    themeReducer,
    messageReducer,
    uiReducer,
    reportReducer,
  });

export default reducers;
