import { CartItem} from "./cart.type";
import {setCartItems, setCartOpen} from "./cart.action";
import {AnyAction} from "redux";


export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

const INITIAL_STATE : CartState = {
    isCartOpen: false,
    cartItems: []
}

export const cartReducer = (state: CartState = INITIAL_STATE, action = {} as AnyAction) => {
    if (setCartItems.match(action)) {
          return {
                    ...state,
                    cartItems: action.payload
                }
    }
    if (setCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload
        }
    }
    return state;

}