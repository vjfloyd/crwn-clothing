import {createStore, applyMiddleware, compose} from 'redux'
import {logger} from "redux-logger/src";
import {rootReducer} from "./root-reducer";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const middleWares =
    [process.env.NODE_ENV !== 'production' && logger]
        .filter(Boolean);

const composeEnhancers =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const composedenhancers = composeEnhancers(applyMiddleware(...middleWares));



export const store =
    createStore(persistedReducer,
        undefined,
        composedenhancers );
export const persistor = persistStore(store);