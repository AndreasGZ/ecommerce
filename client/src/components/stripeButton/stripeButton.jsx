import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({price}) => {
  // Preis in Cent
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_51IShE3JoOIGHBub0uZR5qdnTyAYTKxtgzoYuJt0sSi2ETaX8ALkQoMvRgm6l1dSfZvkWkQ2NkZw4Ok1qYlN9P9oK00pcFPBlz7";

  const onToken = token => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      alert("Payment Successful");
    }).catch(error => {
      console.log("Payment error: ", JSON.parse(error));
      alert("There was an issue with your payment. Please use the provided credit card.");
    });
  }

  return(
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="./logo192.png"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
}

export default StripeCheckoutButton;
