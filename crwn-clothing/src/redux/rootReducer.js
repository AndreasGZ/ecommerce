import {combineReducers} from "redux";
import userReducer from "./user/userReducer";
import cartReducer from "./cart/cartReducer";

// Hier wird ein Objekt mit allen states erstellt
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

export default rootReducer;
