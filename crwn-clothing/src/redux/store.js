import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";

import rootReducer from "./rootReducer";

// Middleware nimmt die action und console.loged sie, dann geht es weiter
const middlewares = [logger];

// Durch den Spread werden die Array-elemente eigene Parameter
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
