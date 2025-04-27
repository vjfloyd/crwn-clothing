import {Action, ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {UserData, USER_ACTIONS_TYPE} from "./user.types";
import {User} from "firebase/auth";
import {AdditionalInformation} from "../../utils/firebase/firebase.utils";


export type SignInSuccess = ActionWithPayload<USER_ACTIONS_TYPE.SIGN_IN_SUCCESS, UserData>;
export type SignInFailure = ActionWithPayload<USER_ACTIONS_TYPE.SIGN_IN_FAILURE, Error>;
export type SignUpFailure = ActionWithPayload<USER_ACTIONS_TYPE.SIGN_UP_FAILURE, Error>;
export type SignOutSuccess = Action<USER_ACTIONS_TYPE.SIGN_OUT_SUCCESS>;
export type SignOutFailure = ActionWithPayload<USER_ACTIONS_TYPE.SIGN_OUT_FAILURE, Error>;

export type EmailSignInStart = ActionWithPayload<USER_ACTIONS_TYPE.EMAIL_SIGN_IN_START, {email: string, password: string}>;
export type GoogleSignInStart = Action<USER_ACTIONS_TYPE.GOOGLE_SIGN_IN_START>;
export type CheckUserSession = Action<USER_ACTIONS_TYPE.CHECK_USER_SESSION>;
export type SignUpStart = ActionWithPayload<USER_ACTIONS_TYPE.SIGN_UP_START, {email: string, password: string, displayName: string}>;
export type SignUpSuccess = ActionWithPayload<USER_ACTIONS_TYPE.SIGN_UP_SUCCESS, {user: User, additionalDetails: AdditionalInformation}>;

export const signInSuccess = withMatcher( (user: UserData & {id: string}) =>
    createAction(USER_ACTIONS_TYPE.SIGN_IN_SUCCESS, user));

export const signInFailure = withMatcher( (error:    Error) =>
    createAction(USER_ACTIONS_TYPE.SIGN_IN_FAILURE, error));

export const signUpFailure = withMatcher( (error: Error) =>
    createAction(USER_ACTIONS_TYPE.SIGN_UP_FAILURE, error));

export const signOutSuccess = withMatcher( () =>
    createAction(USER_ACTIONS_TYPE.SIGN_OUT_SUCCESS));

export const signOutFailure = withMatcher( (error: Error) =>
    createAction(USER_ACTIONS_TYPE.SIGN_OUT_FAILURE, error));




export const setCurrentUser = withMatcher((user: UserData) =>
    createAction(USER_ACTIONS_TYPE.SET_CURRENT_USER, user));

export const checkUserSession = withMatcher(() =>
    createAction(USER_ACTIONS_TYPE.CHECK_USER_SESSION));

export const googleSignInStart = withMatcher(() =>
    createAction(USER_ACTIONS_TYPE.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher(
    ( email : string, password: string ) : EmailSignInStart =>
    createAction(USER_ACTIONS_TYPE.EMAIL_SIGN_IN_START, {email, password}));

export const signUpStart = withMatcher(
    (email: string, password: string, displayName: string) : SignUpStart =>
    createAction(USER_ACTIONS_TYPE.SIGN_UP_START,
        {email, password, displayName}));

export const signUpSuccess = withMatcher((user: User, additionalDetails: AdditionalInformation) =>
    createAction(USER_ACTIONS_TYPE.SIGN_UP_SUCCESS,
        {user, additionalDetails}));



export const signOutStart = withMatcher(() =>
    createAction(USER_ACTIONS_TYPE.SIGN_OUT_START));



