import {USER_ACTIONS_TYPE} from "./user.types";

export const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload} = action;

    switch(type) {
        case USER_ACTIONS_TYPE.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload
            };
        case USER_ACTIONS_TYPE.SIGN_IN_FAILURE:
        case USER_ACTIONS_TYPE.SIGN_UP_FAILURE:
        case USER_ACTIONS_TYPE.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: payload
            };
        case USER_ACTIONS_TYPE.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            };
        default:
            return state;
    }

};

