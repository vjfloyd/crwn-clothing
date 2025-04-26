import { Category } from "./category.types";
import { fetchCategoriesFailure, fetchCategoriesStart, fetchCategoriesSuccess} from "./category.action";
import { AnyAction } from "redux";


export type CategoriesState = {
    readonly categoriesArray: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}


export const CATEGORIES_INITIAL_STATE : CategoriesState = {
    categoriesArray: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE,
    action={} as AnyAction
) => {

    if (fetchCategoriesStart.match(action)){
        return {
            ...state,
            isLoading: true
        }
    }
    if(fetchCategoriesSuccess.match(action)){
        return {
            ...state,
            categoriesArray: action.payload,
            isLoading: false
        }
    }
    if(fetchCategoriesFailure.match(action)){
          return {
                ...state,
                isLoading: false,
                error: action.payload
          }
    }
    return state;
}