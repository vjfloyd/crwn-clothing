import {createSlice} from "@reduxjs/toolkit";

const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};

export const addCartItem = (cartItems, productToAdd) => {
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

export const subtractCartItem = (cartItems, productToSubstract) => {
    return cartItems
        .map((item) =>
            item.id === productToSubstract.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
        .filter((item) => item.quantity > 0);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
    return cartItems.filter((item) => item.id !== productToRemove.id);
};


export const cartSlice = createSlice({
    name: "cart",
    initialState: CART_INITIAL_STATE,
    reducers: {
        addItemToCart(state, action){
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        subsItemToCart(state, action){
            state.cartItems = subtractCartItem(state.cartItems, action.payload);
        },
        removeItem(state, action){
            state.cartItems = removeItemFromCart(state.cartItems, action.payload);
        },
        setCartOpen(state, action){
            state.isCartOpen = action.payload;
        }
    }

});


export const { addItemToCart, removeItem
    , subsItemToCart, setCartOpen } = cartSlice.actions;


export const cartReducer = cartSlice.reducer;
