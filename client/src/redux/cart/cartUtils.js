export const addItemToCart = (cartItems, cartItemToAdd) => {
  // Existiert das Item?
  const existingCartItem = cartItems.find(cartItem =>
    cartItem.id === cartItemToAdd.id);

    // Rückgabe muss ein neues Array sein -> map

    // Wenn es existiert, dann Quantity hochzählen
    if(existingCartItem){
      return cartItems.map(cartItem =>
        cartItem.id === cartItemToAdd.id ? {...cartItem
          , quantity: cartItem.quantity + 1} :
            cartItem
      );
    }
    // Ansonsten Rückgabe aller Items + dem neuen Item mit Quantity=1
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(cartItem =>
    cartItem.id === cartItemToRemove.id);

    // Wenn es 1 ist, dann rausfiltern
    if(existingCartItem.quantity === 1){
      return cartItems.filter(cartItem =>
        cartItem.id !== cartItemToRemove.id
      );
    }

    // Ansonsten Quantität runterzählen
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToRemove.id ? {...cartItem
        , quantity: cartItem.quantity - 1} :
          cartItem
    );
}
