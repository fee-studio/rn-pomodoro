/**
 *  功能：
 */

import {
    combineReducers,
} from 'redux';


import navigatorReducer from '../navigators/reducer'
import taskReducer from '../components/task/reducer'

const appReducer = combineReducers({
    reducerNavigator: navigatorReducer,
    reducerTask: taskReducer,

    // nav: navigatorReducer,
    // todos: todoReducer,
    // filter: filterReducer
});

export default appReducer;