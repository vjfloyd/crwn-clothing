import {createSelector} from "reselect";
import {CartState} from "./cart.reducer";
import {CartItem} from "./cart.type";
import {RootState} from "../store";

const selectCartReducer = (state: RootState): CartState   => state.cart;


export const selectCartItems = createSelector(
  [selectCartReducer],
     (cart: CartState) => cart.cartItems
);


export const selectCartCount = createSelector(
  [selectCartItems],
    (cartItems: CartItem[]) =>
        cartItems.reduce((total, item) =>
            total + item.quantity, 0)

)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems: CartItem[]) =>
        cartItems.reduce((total, item) =>
            total + item.quantity * item.price, 0)

)

export const selectCartIsOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);

