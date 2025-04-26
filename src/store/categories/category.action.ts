import {Action, ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {CATEGORIES_ACTION_TYPES, Category} from "./category.types";


export type fetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type fetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type fetchCategoriesFailure = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, Error>;


export const fetchCategoriesStart = withMatcher(  () : fetchCategoriesStart => (
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
));


export const fetchCategoriesSuccess = withMatcher( (categoriesArray : Category[]) : fetchCategoriesSuccess => (
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)
));


export const fetchCategoriesFailure = withMatcher( (error: Error) : fetchCategoriesFailure => (
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error)
));

