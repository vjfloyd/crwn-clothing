import {createAction} from "../../utils/reducer.utils";
import {CATEGORIES_ACTION_TYPES} from "./category.types";



export const fetchCategoriesSuccess = (categoriesArray) => (
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)
);

export const fetchCategoriesFailure = () => (error) => (
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error)
)

export const fetchCategoriesStart = () => (
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);
