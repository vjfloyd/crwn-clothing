import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import {getCategoriesAndCollections} from "../../utils/firebase/firebase.utils";
import {fetchCategoriesFailure, fetchCategoriesSuccess} from "./category.action";
import {CATEGORIES_ACTION_TYPES} from "./category.types";


export function* fetchCategoriesAsync()  {
    try {
        console.log('Saga fetchCategoriesAsync started');
        const categoriesArray = yield* call(getCategoriesAndCollections);
        yield*  put(fetchCategoriesSuccess(categoriesArray));
        console.log('Categories fetched:', categoriesArray);
    } catch (error) {
        console.log('Error fetching categories:', error);

        yield*  put(fetchCategoriesFailure(error as Error));
    }
}


export function* onFetchCategories() {
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)]);
}