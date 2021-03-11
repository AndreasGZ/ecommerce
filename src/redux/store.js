import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import {persistStore} from "redux-persist";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

// Middleware nimmt die action und console.loged sie, dann geht es weiter
const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV == "development"){
  middlewares.push(logger);
}

// Durch den Spread werden die Array-elemente eigene Parameter
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//Pass in the Sagas
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
