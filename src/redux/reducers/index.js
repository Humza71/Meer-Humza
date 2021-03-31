import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";

import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import messageReducer from "./messageReducer";
import uiReducer from "./uiReducer";
import reportReducer from "./reportReducer";
import dashboardReducer from "./dashboardReducer";
import clientReducer from "./clientReducer";
import licenseReducer from "./licenseReducer";

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    authReducer,
    themeReducer,
    messageReducer,
    uiReducer,
    reportReducer,
    dashboardReducer,
    clientReducer,
    licenseReducer,
  });

export default reducers;
