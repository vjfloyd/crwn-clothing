export enum CATEGORIES_ACTION_TYPES {
    FETCH_CATEGORIES_SUCCESS = "category/SET_CATEGORIES_SUCCESS",
    FETCH_CATEGORIES_FAILURE = "category/SET_CATEGORIES_FAILURE",
    FETCH_CATEGORIES_START = "category/SET_CATEGORIES_START",
}



export type Category = {
    title: string;
    imageUrl: string;
    items: CategoryItem[];
}

export type CategoryItem = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
};

export type CategoryMap = {
    [key: string]: CategoryItem[];
}