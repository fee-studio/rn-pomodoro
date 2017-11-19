/**
 *  功能：
 */

import {combineReducers} from 'redux';
import {NavigationActions} from 'react-navigation';
import {RootStack, RootTabs, tabTask} from './AppNavigator';
import {
    NAV_TO_CREATE_TASK, NAV_TO_TASK_SCREEN, NAV_TO_TASK_SCREEN_SELECT_TASK,
    NAV_TO_TOMATO_SCREEN_WITH_TASK
} from "./actionTypes";


//Force a Init of the main router
let initialNavState = RootStack.router.getStateForAction(
    NavigationActions.init()
);

// const firstAction = AppNavigator.router.getActionForPathAndParams("RootTabs");
//
// //Then calculate the state with a navigate action to the first route, sending the previous initialized state as argument
// initialNavState = AppNavigator.router.getStateForAction(
//     firstAction,
//     initialNavState
// );

const navigatorReducer = (state = initialNavState, action) => {
    let nextState;
    switch (action.type) {
        case NAV_TO_CREATE_TASK:
            nextState = RootStack.router.getStateForAction(NavigationActions.navigate({routeName: 'CreateTask'}), state);
            nextState = {...nextState, item: action.item}
            break;
        case NAV_TO_TASK_SCREEN:
            nextState = RootStack.router.getStateForAction(NavigationActions.navigate({routeName: 'TaskTab'}), state);
            nextState = {...nextState, taskScreenType: action.taskScreenType}
            break;
        case NAV_TO_TASK_SCREEN_SELECT_TASK:
            nextState = RootStack.router.getStateForAction(NavigationActions.navigate({routeName: 'TaskListScreen4Select'}), state);
            nextState = {...nextState, taskScreenType: action.taskScreenType}
            break;
        case NAV_TO_TOMATO_SCREEN_WITH_TASK:
            nextState = RootStack.router.getStateForAction(NavigationActions.back(), state);
            nextState = {...nextState, task: action.task}
            break;
        default:
            // VIP 很关键的一步，虽然感觉这样写是狗屎。
            if (action.routeName === 'TaskTab') {
                state = initialNavState;
            }
            nextState = RootStack.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
};

export default navigatorReducer;