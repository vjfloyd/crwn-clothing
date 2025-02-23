import {createContext, useEffect, useReducer} from "react";
import { createAction } from "../utils/reducer.utils";

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
  subsItemToCart: () => {},
  removeItem: () => {},
  cartCount: 0,
  cartTotal: 0,
});


const cartReducer = (state, action) => {
    const  { type, payload } = action;

    switch (type) {
        case "SET_CART_ITEMS":
            return {
                ...state,
                ...payload
            }
        case "SET_CART_OPEN":
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Invalid action type ${type} in cartReducer`);
    }
}

export const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

export const CartProvider = ({ children }) => {

  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (items) => {
        const cartCountUpdated = items.reduce((total, item) => total + item.quantity, 0);
        const cartTotalUpdated = items.reduce((total, item) => total +item.quantity* item.price, 0);

        dispatch( createAction('SET_CART_ITEMS', {
            cartItems: items,
            cartCount: cartCountUpdated,
            cartTotal: cartTotalUpdated
        }));
    }

  const addItemToCart = (productToAdd) => {
    const updateCartItems = addCartItem(cartItems, productToAdd);
      updateCartItemsReducer(updateCartItems);
    return updateCartItems;
  };

  const subsItemToCart = (productToSubs) => {
    const updatedCartItems = substractCartItem(cartItems, productToSubs);
      updateCartItemsReducer(updatedCartItems);
    return updatedCartItems;

  };

  const removeItem = (productToRemove) => {
    const updatedCartItems = removeItemFromCart(cartItems, productToRemove);
      updateCartItemsReducer(updatedCartItems);
    return updatedCartItems;
  };

   const setIsCartOpen = (isOpen) => {
         dispatch(createAction('SET_CART_ITEMS', isOpen));
   }

    useEffect(() => {}, [cartItems]);

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
