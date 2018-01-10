/**
 *  功能：
 */

import {createStore, applyMiddleware, compose} from 'redux';
import appReducer from "./reducer";
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'

// import Perf from 'react-addons-perf'

// const win = window;
// win.Perf = Perf

import {DEBUG} from '../utils/Config'
import screenTracking from "../navigators/ScreenTrackingMiddleware";

const logger = createLogger({
    duration: true,
    collapsed: true
});

// 中间件
const middlewares = [thunk, screenTracking];
if (DEBUG) {
    middlewares.push(logger)
}

// Store Enhancer
const storeEnhancers = compose(
    applyMiddleware(...middlewares),
);

const store = createStore(appReducer, {}, storeEnhancers);

export default store;


/// VIP https://stackoverflow.com/questions/41146446/get-rid-of-remote-debugger-is-in-a-background-tab-warning-in-react-native
console.ignoredYellowBox = ['Remote debugger'];



