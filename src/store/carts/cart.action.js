import {createAction} from "../../utils/reducer.utils";
import {CART_TYPES} from "./cart.type";


export const setCartItems = (cartItems) => (
    createAction(CART_TYPES.SET_CART_ITEMS, cartItems)
);

export const setCartOpen = (isCartOpen) => (
    createAction(CART_TYPES.SET_CART_OPEN, isCartOpen)
);


export const addItemToCart = (cartItems, productToAdd) => {
    const updateCartItems = addCartItem(cartItems, productToAdd);

    createAction(CART_TYPES.SET_CART_ITEMS, updateCartItems);
    return setCartItems(updateCartItems);
};

export const subsItemToCart = (cartItems, productToSubs) => {
    const updatedCartItems = substractCartItem(cartItems, productToSubs);
    createAction(CART_TYPES.SET_CART_ITEMS, updatedCartItems);
    return setCartItems(updatedCartItems);

};

export const removeItem = (cartItems, productToRemove) => {
    const updatedCartItems = removeItemFromCart(cartItems, productToRemove);
   createAction(CART_TYPES.SET_CART_ITEMS, updatedCartItems);

    return setCartItems(updatedCartItems);
};

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