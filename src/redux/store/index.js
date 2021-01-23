// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";

// import { rootReducer } from "../reducers/index";

// const composeEnhancers = composeWithDevTools({});

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

// export default store;

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { routerMiddleware } from "connected-react-router";

import config from "config";
import history from "utils/history";
import createRootReducer from "../reducers";

const devMode = config.env === "development";

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

if (devMode) {
  middleware.push(logger);
}

const store = configureStore({
  reducer: createRootReducer(history),
  middleware,
});

export default store;
