import {createAction} from "../../utils/reducer.utils";
import {CART_TYPES} from "./cart.type";
import {useDispatch} from "react-redux";


export const setCartItems = (cartItems) => (
    createAction(CART_TYPES.SET_CART_ITEMS, cartItems)
);

export const setCartOpen = (isCartOpen) => (
    createAction(CART_TYPES.SET_CART_OPEN, isCartOpen)
);


export const addItemToCart = (cartItems, productToAdd) => {
    const updateCartItems = addCartItem(cartItems, productToAdd);
    // updateCartItemsReducer(updateCartItems);

    createAction(CART_TYPES.SET_CART_ITEMS, updateCartItems);
    return setCartItems(updateCartItems);
};

export const subsItemToCart = (cartItems, productToSubs) => {
    const updatedCartItems = substractCartItem(cartItems, productToSubs);
    // updateCartItemsReducer(updatedCartItems);
    createAction(CART_TYPES.SET_CART_ITEMS, updatedCartItems);
    return setCartItems(updatedCartItems);

};

export const removeItem = (cartItems, productToRemove) => {
    const updatedCartItems = removeItemFromCart(cartItems, productToRemove);
    // updateCartItemsReducer(updatedCartItems);
    createAction(CART_TYPES.SET_CART_ITEMS, updatedCartItems);

    return setCartItems(updatedCartItems);
};

// const updateCartItemsReducer = (items) => {
//     const cartCountUpdated = items.reduce((total, item) => total + item.quantity, 0);
//     const cartTotalUpdated = items.reduce((total, item) => total +item.quantity* item.price, 0);
//
//     dispatch( createAction('SET_CART_ITEMS', {
//         cartItems: items,
//         cartCount: cartCountUpdated,
//         cartTotal: cartTotalUpdated
//     }));
// }

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