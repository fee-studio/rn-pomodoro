/**
 *  功能：
 */

import {
    combineReducers,
} from 'redux';


import navigatorReducer from '../navigators/reducer'

const appReducer = combineReducers({
    reducerNavigator: navigatorReducer,

    // nav: navigatorReducer,
    // todos: todoReducer,
    // filter: filterReducer
});

export default appReducer;