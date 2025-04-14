import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger/src";
import {rootReducer} from "./root-reducer";




const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);


export const store = configureStore({
     reducer: rootReducer,
     middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(middleWares),
     });




// import {createStore, applyMiddleware, compose} from 'redux'
// import {logger} from "redux-logger/src";
// import {rootReducer} from "./root-reducer";
// import storage from 'redux-persist/lib/storage';
// import {persistReducer, persistStore} from "redux-persist";
//
//
// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist: ['user']
// }
//
// const persistedReducer = persistReducer(persistConfig, rootReducer);
//
//
// const middleWares =
//     [process.env.NODE_ENV !== 'production' && logger]
//         .filter(Boolean);
//
// const composeEnhancers =
//     (process.env.NODE_ENV !== 'production' &&
//         window &&
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//
//
// const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));
//
//
//
// export const store =
//     createStore(persistedReducer,
//         undefined,
//         composedEnhancers );
// export const persistor = persistStore(store);