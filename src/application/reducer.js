/**
 *  功能：
 */

import {
    combineReducers,
} from 'redux';


import navigatorReducer from '../navigators/reducer'
import taskReducer from '../components/task/reducer'

const appReducer = combineReducers({
    // reducerNavigator: navigatorReducer, // 从 react-navigation（V3）开始就不用reducer来管理导航了
    reducerTask: taskReducer,

    // nav: navigatorReducer,
    // todos: todoReducer,
    // filter: filterReducer
});

export default appReducer;