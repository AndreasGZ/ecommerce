import {createSelector} from "reselect";

//Hiermit können Selectoren gebaut werden, damit beim ändern des states
//Nicht alles neu gerenert wird, sondern nur die Selectoren

//Input- und Output-Selectors
// state enthält cart und user
//Input
const selectCart = state => state.cart;

// Output
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
    accumulatedQuantity + cartItem.quantity
    , 0)
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
    accumulatedQuantity + cartItem.quantity * cartItem.price
    , 0)
);
