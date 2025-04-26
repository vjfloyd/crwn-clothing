import {AnyAction} from "redux";
import {
    signInFailure,
    signInSuccess, signOutFailure, signOutSuccess, signUpFailure
} from "./user.action";
import {UserData} from "./user.types";


export type UserState = {
    readonly currentUser: null | UserData;
    readonly isLoading: boolean;
    readonly error: null | Error;
}

export const INITIAL_STATE : UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state  = INITIAL_STATE, action = {}  as AnyAction ) => {
    if (signInSuccess.match(action)){
        return {
                    ...state,
                    currentUser: action.payload
                };
    }
    if (signInFailure.match(action) || signUpFailure.match(action) || signOutFailure.match(action)) {
        return {
            ...state,
            error: action.payload
        }
    }
    if (signOutSuccess.match(action)) {
                return {
                    ...state,
                    currentUser: null
                };
    }
    return state;

};

