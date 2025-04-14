import {createSlice} from "@reduxjs/toolkit";

export const CATEGORIES_INITIAL_STATE = {
    categoriesArray: []
}

export const categoriesSlice = createSlice({
    name: "category",
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        setCategories(state, action){
            state.categoriesArray = action.payload;
        },
    }
})


export const {setCategories} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

