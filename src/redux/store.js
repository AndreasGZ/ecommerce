import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import {persistStore} from "redux-persist";

import rootReducer from "./rootReducer";

// Middleware nimmt die action und console.loged sie, dann geht es weiter
const middlewares = [];

if(process.env.NODE_ENV == "development"){
  middlewares.push(logger);
}

// Durch den Spread werden die Array-elemente eigene Parameter
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
