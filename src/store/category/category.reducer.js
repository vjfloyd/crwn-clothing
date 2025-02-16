import { CATEGORIES_TYPE } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
  categoriesArray: [],
};

export const categoryReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_TYPE.SET_CATEGORIES:
      return {
        ...state,
        categoriesArray: payload,
      };
    default:
      return state;
  }
};
