import {categoriesReducer} from "./categories/category.reducer";
import { cartReducer} from "./carts/cart.reducer";
import {combineReducers} from "@reduxjs/toolkit";
import {userReducer} from "./user/user.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
})