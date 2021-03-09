import React from "react";
import CustomButton from "../custom-button/custom-button";
import {connect} from "react-redux";
import "./cart-dropdown.scss";
import CartItem from "../cartItem/cartItem";
import { createStructuredSelector} from "reselect";
import {selectCartItems} from "../../redux/cart/cartSelectors";
import {withRouter} from "react-router-dom";
import {toggleCartHidden} from "../../redux/cart/cartActions";


const CartDropdown = ({cartItems, history, dispatch}) => (
  <div className="cart-dropdown" >
    <div className="cart-items" >
      {
        cartItems.length ?
        cartItems.map(cartItem =>
          <CartItem key={cartItem.id} item={cartItem}/>)
        :
          <span className="empty-message">Your cart is empty</span>
      }
    </div>
    <CustomButton onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}>
        GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

//Wenn dispatchToProps nicht angegeben, dann wird dispatch an die Componente übergeben

export default withRouter(connect(mapStateToProps)(CartDropdown));
