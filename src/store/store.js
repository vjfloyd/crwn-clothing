import {createStore, applyMiddleware, compose} from 'redux'
// import {logger} from "redux-logger/src";
import {rootReducer} from "./root-reducer";

// const middlewares = [logger];

const loggerMiddelware = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action);
    }
    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentState', store.getState());
    next(action);

    console.log('nextState', store.getState());

}

const middleWares = [loggerMiddelware];

const composednhancers = compose(applyMiddleware(...middleWares));



export const store =
    createStore(rootReducer, undefined, composednhancers );