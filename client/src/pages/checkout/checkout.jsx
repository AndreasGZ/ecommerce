import "./checkout.scss";
import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartTotal} from "../../redux/cart/cartSelectors";
import CheckoutItem from "../../components/checkoutItem/checkoutItem";
import StripeCheckoutButton from "../../components/stripeButton/stripeButton";


const ChekoutPage = ({cartItems, totalPrice}) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>

      <div className="header-block">
        <span>Description</span>
      </div>

      <div className="header-block">
        <span>Quantity</span>
      </div>

      <div className="header-block">
        <span>Price</span>
      </div>

      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {
      cartItems.map(cartItem =>
        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
      )
    }
    <div className="total">
      <div>Total ${totalPrice}</div>
      <div className="red">
        *Please use the following test credit card for payments*
      </div>
      <div className="red">
        4242 4242 4242 4242 - Exp: 01/35 - CW:123
      </div>
      <StripeCheckoutButton price={totalPrice} />
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalPrice: selectCartTotal
});

export default connect(mapStateToProps)(ChekoutPage);
