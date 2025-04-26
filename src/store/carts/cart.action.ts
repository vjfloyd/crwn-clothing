import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {CART_TYPES, CartItem} from "./cart.type";


export type setCartItems = ActionWithPayload< CART_TYPES.SET_CART_ITEMS, CartItem[]>;
export type setCartOpen = ActionWithPayload<CART_TYPES.SET_CART_OPEN, boolean>;



export const setCartOpen =  withMatcher( (isCartOpen : boolean) =>
    createAction(CART_TYPES.SET_CART_OPEN, isCartOpen)
);

export const setCartItems = withMatcher( (cartItems: CartItem[]) =>
    createAction(CART_TYPES.SET_CART_ITEMS, cartItems));





export const addItemToCart = (cartItems: CartItem[], productToAdd: CartItem) => {
    const updateCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(updateCartItems);
};


export const subsItemToCart = (cartItems : CartItem[], productToSubs: CartItem) => {
    const updatedCartItems = substractCartItem(cartItems, productToSubs);
    return setCartItems(updatedCartItems);
};

export const removeItem = (cartItems: CartItem[], productToRemove: CartItem) => {
    const updatedCartItems = removeItemFromCart(cartItems, productToRemove);
    return setCartItems(updatedCartItems);
};

const addCartItem =
    (cartItems: CartItem[], productToAdd: CartItem): CartItem[] => {
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

const substractCartItem =
    (cartItems: CartItem[], productToRemove: CartItem) : CartItem[] => {
    return cartItems
        .map((item) =>
            item.id === productToRemove.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
        .filter((item) => item.quantity > 0);
};

const removeItemFromCart =
    (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    return cartItems.filter((item) => item.id !== productToRemove.id);
};