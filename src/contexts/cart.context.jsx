import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.util";

const addCartItem = (cartItems, productToAdd) => {
  const found = cartItems.find((item) => item.id === productToAdd.id);
  if (found) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const substractCartItem = (cartItems, productToAdd) => {
  return cartItems
    .map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0);
};

const removeItemFromCart = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION = {
  CART_ITEMS: "SET_CART_ITEMS",
  IS_CART_OPEN: "SET_CART_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION.CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION.IS_CART_OPEN:
      return {
        ...state,
        ...payload,
      };

    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartCount, cartTotal, cartItems }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    dispatch(
      createAction(CART_ACTION.CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const subsItemToCart = (productToSubs) => {
    const newCartItems = substractCartItem(cartItems, productToSubs);
    updateCartItemsReducer(newCartItems);
  };

  const removeItem = (productToRemove) => {
    const newCartItems = removeItemFromCart(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const updateCartStatus = (status) => {
    dispatch(createAction(CART_ACTION.IS_CART_OPEN, { isCartOpen: status }));
  };

  const setIsCartOpen = (status) => {
    updateCartStatus(status);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    subsItemToCart,
    removeItem,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
