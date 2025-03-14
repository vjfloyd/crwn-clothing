import { createSelector } from 'reselect';


const selectCategoryReducer = (state) => {
    console.log('select 1 fired');
    return state.categories;
}


export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        console.log('select 2 fired');
        return categoriesSlice.categoriesArray;
    }
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
        (categories) => {
                console.log('select 3 fired');
                 return categories.reduce((acc, category) => {
                     const { title, items } = category
                     acc[title.toLowerCase()] = items;
                     console.log('title ', title.toLowerCase())
                     console.log('items ', acc[title.toLowerCase()])
                     return acc;
                }, {});
});


export const selectCategoryLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.isLoading;
});

