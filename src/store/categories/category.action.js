import {createAction} from "../../utils/reducer.utils";
import {CATEGORIES_ACTION_TYPES} from "./category.types";
import {getCategoriesAndCollections} from "../../utils/firebase/firebase.utils";



export const fetchCategoriesSuccess = (categoriesArray) => (
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)
);

export const fetchCategoriesFailure = (error) => (error) => (
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error)
)

export const fetchCategoriesStart = () => (
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoryArray = await getCategoriesAndCollections();
        dispatch(fetchCategoriesSuccess(categoryArray));
    } catch (error) {
     dispatch(fetchCategoriesFailure(error));
    }

}