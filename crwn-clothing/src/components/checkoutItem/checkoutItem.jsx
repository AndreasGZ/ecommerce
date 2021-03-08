import "./checkout-item.scss";
import React from "react";
import {createStructuredSelector} from "reselect";
import {selectCartItems} from "../../redux/cart/cartSelectors";
import {connect} from "react-redux";
import {clearItemFromCart} from "../../redux/cart/cartActions";
import {addItem, removeItem} from "../../redux/cart/cartActions";


const CheckoutItem = ({cartItem, clearItem, addItem, removeItem}) => {
  const {name, price, quantity, imageUrl} = cartItem;
  return (
  <div className= "checkout-item">
    <div className="image-container">
      <img src={imageUrl} alt="item"/>
    </div>
    <span className="name">{name}</span>
    <span className="quantity">
      <div className="arrow" onClick={() => removeItem(cartItem)}>
        &#10094;
      </div>
      <span className="value">{quantity}</span>
      <div className="arrow" onClick={() => addItem(cartItem)}>
        &#10095;
      </div>
    </span>
    <span className="price">${price}</span>
    <div className="remove-button" onClick={() =>
    clearItem(cartItem)}>&#10005;</div>
  </div>
)}

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item)),
})

export default connect(null, mapDispatchToProps)(CheckoutItem);
