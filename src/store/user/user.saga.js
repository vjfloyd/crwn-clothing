import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser
} from "../../utils/firebase/firebase.utils";
import {USER_ACTIONS_TYPE} from "./user.types";
import {
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess
} from "./user.action";


export function* getSnapshotFormUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        if (!userSnapshot) {
            console.error("User snapshot is undefined");
            throw new Error('User snapshot is undefined');
        }
        console.log('Dispatching signInSuccess');
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
        console.log('userSnapshot:', userSnapshot);


    }catch (error) {
        console.log('getSnapshotFormUserAuth Error:', error);
        yield put(signInFailure(error));
    }

}

export function* signInWithGoogle() {
    try{
       const { user } = yield call(signInWithGooglePopup);
       console.log('user signInWithGoogle:', user);
       yield call(getSnapshotFormUserAuth, user);
    }catch (error) {
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFormUserAuth, userAuth);

    } catch (error) {
        console.log('isUserAuthenticated Error:', error);
        yield put(signInFailure(error));
    }
}

export function* onCheckUserSession() {
    console.log('Saga onCheckUserSession listening');

    yield takeLatest(USER_ACTIONS_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signInWithEmail({ payload : { email, password }}) {
    try{
        console.log("signInWithEmail started");
       const { user } =  yield call(signInAuthUserWithEmailAndPassword,email, password);
       yield call(getSnapshotFormUserAuth, user);
    }catch (error) {
        yield put(signInFailure(error));
    }

}

export function* signUp( { payload: {email, password, displayName }}) {
    try{
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
       yield put(signUpSuccess(user, { displayName}));

    }catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp( { payload: { user, additionalDetails }}) {
    yield call(getSnapshotFormUserAuth, user, additionalDetails);
}


export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    }catch (error) {
        console.log('signOut Error:', error);
        yield put(signOutFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTIONS_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
    console.log('Saga onGoogleSignInStart listening');
    yield takeLatest(USER_ACTIONS_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}


export function* onSignUpStart() {
    console.log('Saga onSignUpStart listening');
    yield takeLatest(USER_ACTIONS_TYPE.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTIONS_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp);
}


export function* onSignOutStart() {
    yield takeLatest(USER_ACTIONS_TYPE.SIGN_OUT_START, signOut);
}

export function* userSagas(){
    yield all([call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}