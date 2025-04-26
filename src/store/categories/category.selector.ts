import { createSelector } from 'reselect';
import {CategoriesState} from "./category.reducer";
import {CategoryMap} from "./category.types";
import {RootState} from "../store";


const selectCategoryReducer = (state : RootState) : CategoriesState => state.categories;



export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.categoriesArray;
    }
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
        (categories) : CategoryMap => {
                 return categories.reduce((acc, category)  => {
                     const { title, items } = category
                     acc[title.toLowerCase()] = items;
                     return acc;
                }, {} as CategoryMap);
});


export const selectCategoryLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.isLoading;
});

