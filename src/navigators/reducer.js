/**
 *  功能：
 */

import {combineReducers} from 'redux';
import {NavigationActions} from 'react-navigation';
import {RootStack} from './AppNavigator';
import {NAV_TO_CREATE_TASK} from "./actionTypes";


// Start with two routes: The Main screen, with the Login screen on top.
// const firstAction = AppNavigator.router.getActionForPathAndParams('RootTabs');
// const secondAction = AppNavigator.router.getActionForPathAndParams('RootTabs');
//
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
//
// const initialNavState = AppNavigator.router.getStateForAction(
//     secondAction,
//     tempNavState
// );

// function nav(state = {}, action) {
//     let nextState;
//     switch (action.type) {
//         case 'Login':
//             nextState = AppNavigator.router.getStateForAction(
//                 NavigationActions.back(),
//                 state
//             );
//             break;
//         case 'Logout':
//             nextState = AppNavigator.router.getStateForAction(
//                 NavigationActions.navigate({routeName: 'Login'}),
//                 state
//             );
//             break;
//         default:
//             // nextState = AppNavigator.router.getStateForAction(action, state);
//             break;
//     }
//
//     // Simply return the original `state` if `nextState` is null or undefined.
//     return nextState || state;
// }
//
// const initialAuthState = {isLoggedIn: false};
//
// function auth(state = initialAuthState, action) {
//     switch (action.type) {
//         case 'Login':
//             return {...state, isLoggedIn: true};
//         case 'Logout':
//             return {...state, isLoggedIn: false};
//         default:
//             return state;
//     }
// }
//
// const NavigatorReducer = combineReducers({
//     nav,
//     auth,
// });
//
// export default NavigatorReducer;


// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('RootTabs'));
// const navigatorReducer = (state = initialState, action) => {
//     const nextState = AppNavigator.router.getStateForAction(action, state);
//
//     // Simply return the original `state` if `nextState` is null or undefined.
//     return nextState || state;
// };
//
// export default navigatorReducer;


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


// function nav(state, action) {
//     switch (action.type) {
//         case NAV_TO_CREATE_TASK:
//             return {...state, isLoggedIn: true};
//         case 'Logout':
//             return {...state, isLoggedIn: false};
//         default:
//             return state;
//     }
// }


const navigatorReducer = (state = initialNavState, action) => {
    let nextState;
    switch (action.type) {
        case NAV_TO_CREATE_TASK:
            nextState = RootStack.router.getStateForAction(NavigationActions.navigate({routeName: 'CreateTask'}), state);
            // nextState = RootStack.router.getStateForAction(action, state);
            // NavigationActions.navigate({routeName: 'CreateTask'})

            nextState = {...nextState, item: action.item}

            break;
        default:
            nextState = RootStack.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
};

// const navigatorReducer = (state = initialNavState, action) => {
//     const nextState = RootStack.router.getStateForAction(action, state);
//
//     // Simply return the original `state` if `nextState` is null or undefined.
//     return nextState || state;
// };

export default navigatorReducer;