import React from "react";
import "./cart-icon.scss";
import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import {connect} from "react-redux";
import {toggleCartHidden} from "../../redux/cart/cartActions";
import { createStructuredSelector} from "reselect";
import {selectCartItemsCount} from "../../redux/cart/cartSelectors";

const CartIcon = ({toggleCartHidden, itemCount}) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon"/>
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  // Objekt aus dem Action weitergeben
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

// Selector, nimmt einen Teil aus dem state und erzeugt einen neuen Value
// Immer wenn der state geändert wird, auch username, dann wird rerendered
// Aber es gibt einen check, ob die Zahl sich verändert, wenn nein, dann wird nicht rerendered
// const mapStateToProps = ({cart: {cartItems}}) => ({
//   // Summieren der Quantitäten der Items, durch Reducer
//   //Initialwert ist 0
//   itemCount: cartItems.reduce(
//     (accumulatedQuantity, cartItem) =>
//     accumulatedQuantity + cartItem.quantity
//     , 0)
// })

//Selectors
const mapStateToProps = createStructuredSelector({
  // Summieren der Quantitäten der Items, durch Reducer
  //Initialwert ist 0
  itemCount: selectCartItemsCount
})

export default connect(mapStateToProps , mapDispatchToProps)(CartIcon);
