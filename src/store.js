/**
 *  功能：
 */

import {
    createStore,
    // applyMiddleware,
    // compose
} from 'redux';

import appReducer from "./reducer";

// import {reducer as todoReducer} from './todos';
// import {reducer as filterReducer} from './filter';

// import Perf from 'react-addons-perf'

// const win = window;
// win.Perf = Perf

// const middlewares = [];
// if (process.env.NODE_ENV !== 'production') {
//     middlewares.push(require('redux-immutable-state-invariant')());
// }
//
// const storeEnhancers = compose(
//     applyMiddleware(...middlewares),
//     (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
// );

/// VIP https://stackoverflow.com/questions/41146446/get-rid-of-remote-debugger-is-in-a-background-tab-warning-in-react-native
console.ignoredYellowBox = ['Remote debugger'];


export default createStore(appReducer);

// export default createStore(reducer, {}, storeEnhancers);


