// /**
//  *  功能：navigation + reducer
//  *  从 react-navigation v3 开始弃用
//  */
//
// import {NavigationActions,StackActions} from 'react-navigation';
// import AppNavigator, {RootStack, RootTabs, tabTask} from './AppNavigator';
// import {
//     NAV_TO_CREATE_TASK, NAV_TO_TASK_SCREEN, NAV_TO_TASK_SCREEN_SELECT_TASK,
//     NAV_TO_TOMATO_SCREEN_WITH_TASK, NAV_TO_TUCAO_WEB_VIEW, NAV_TO_WEB_VIEW
// } from "./actionTypes";
// import {createNavigationReducer} from "react-navigation-redux-helpers";
//
//
// // Force a Init of the main router
// // let initialNavState = RootStack.router.getStateForAction(NavigationActions.init());
//
//
// // const initialNavState = AppNavigator.router.getStateForAction(StackActions.reset({
// //     index: 0,
// //     actions: [
// //         NavigationActions.navigate({
// //             routeName: 'RootTabs',
// //         }),
// //     ],
// // }));
//
// // const initialNavState = RootTabs.router.getActionForPathAndParams("RootTabs");
// // const initialNavState = AppNavigator.router.getActionForPathAndParams("RootTabs");
// //
// // //Then calculate the state with a navigate action to the first route, sending the previous initialized state as argument
// // initialNavState = AppNavigator.router.getStateForAction(
// //     firstAction,
// //     initialNavState
// // );
//
// const initialNavState = RootTabs.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('RootTabs'));
//
// // 方案一
// // const navReducer = createNavigationReducer(AppNavigator);
// // export default navReducer;
//
// //* 方案二
// const navigatorReducer = (state = initialNavState, action) => {
//     let nextState = RootTabs.router.getStateForAction(action, state);
//
//     switch (action.type) {
//         case NAV_TO_CREATE_TASK:
//             nextState = RootStack.router.getStateForAction(StackActions.navigate({routeName: 'CreateTask'}), state);
//             nextState = {...nextState, item: action.item}
//             break;
//         case NAV_TO_TASK_SCREEN:
//             nextState = RootStack.router.getStateForAction(NavigationActions.navigate({routeName: 'TaskTab'}), state);
//             nextState = {...nextState, taskScreenType: action.taskScreenType}
//             break;
//         case NAV_TO_TASK_SCREEN_SELECT_TASK:
//             nextState = RootStack.router.getStateForAction(NavigationActions.navigate({routeName: 'TaskListScreen4Select'}), state);
//             nextState = {...nextState, taskScreenType: action.taskScreenType}
//             break;
//         case NAV_TO_TOMATO_SCREEN_WITH_TASK:
//             nextState = RootStack.router.getStateForAction(NavigationActions.back(), state);
//             // nextState = RootStack.router.getStateForAction(NavigationActions.navigate({routeName: 'TomatoTab'}), state);
//             nextState = {...nextState, task: action.task}
//             break;
//         case NAV_TO_WEB_VIEW:
//             nextState = RootStack.router.getStateForAction(NavigationActions.navigate({routeName: 'WebViewComponent'}), state);
//             nextState = {...nextState, url: action.url}
//             break;
//         case NAV_TO_TUCAO_WEB_VIEW:
//             nextState = RootStack.router.getStateForAction(NavigationActions.navigate({routeName: 'TuCaoWebView'}), state);
//             nextState = {...nextState, url: action.url}
//             break;
//         default:
//             // VIP 很关键的一步，虽然感觉这样写是狗屎。
//             if (action.routeName === 'TaskTab') {
//                 state = initialNavState;
//             }
//             nextState = RootStack.router.getStateForAction(action, state);
//             break;
//     }
//     return nextState || state;
// };
//
// export default navigatorReducer;
