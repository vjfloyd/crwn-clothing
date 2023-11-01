import { createContext, useState, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.util.js";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils.js";

//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION = {
  CURRENT_USER: "CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION.CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      throw new Error("unhandled type,  " + type);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION.CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const subscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return subscribe;
  }, []);

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};
