import {combineReducers} from "redux";
import userReducer from "./user/userReducer";
import cartReducer from "./cart/cartReducer";
import directoryReducer from "./directory/directoryReducer";
import shopReducer from "./shop/shopReducer";
import {persistReducer} from "redux-persist";
// LocalStorage
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  // Nur der cartReducer
  whitelist: ["cart"]
}

// Hier wird ein Objekt mit allen states erstellt
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
