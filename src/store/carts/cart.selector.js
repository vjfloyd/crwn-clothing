import {createSelector} from "reselect";

const selectCartReducer = (state) => state.cart;


export const selectCartItems = createSelector(
  [selectCartReducer],
     (cart) => cart.cartItems
);


export const selectCartCount = createSelector(
  [selectCartItems],
    (cartItems) => {
        return cartItems.reduce((total, item) =>
            total + item.quantity, 0);
    }
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => {
        return cartItems.reduce((total, item) =>
            total + item.quantity * item.price, 0);
    }
)

export const selectCartIsOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);

