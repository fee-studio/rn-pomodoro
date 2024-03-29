// /**
//  *  功能：
//  */
//
// import React, {Component} from 'react'
// import {
//     Dimensions,
//     Platform,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     View,
// } from 'react-native';
// import {
//     createAppContainer,
//     createBottomTabNavigator,
//     createStackNavigator, getActiveChildNavigationOptions,
//     HeaderStyleInterpolator,
// } from 'react-navigation'
//
// import TomatoScreen from '../components/tomato/TomatoScreen'
// import StatisticsScreen from '../components/statistics/StatisticsScreen'
// import SettingScreen from '../components/setting/SettingScreen'
// import CreateTaskScreen from "../components/task/CreateTaskScreen";
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import {COLOR} from "../utils/Config";
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import TaskListScreen from "../components/task/TaskListScreen";
// import TuCaoWebView from "../components/setting/TuCaoWebView";
// import WebViewComponent from "../components/common/WebViewComponent";
// import {toTaskScreen} from "./actions";
// import DemoScreen from "../components/DemoScreen";
// import ComponentTemplete from "../other/ComponentTemplate";
// import Ionicons from "react-native-vector-icons/Ionicons";
// // import Icon from 'react-native-vector-icons/Entypo';
//
// export const tabTomato = createStackNavigator(
//     {
//         TomatoScreen: {screen: TomatoScreen},
//     },
//     {
//         headerMode: 'none', // hide self navigation bar
//         navigationOptions: {
//             // tabBarOnPress: ({route, index}, jumpToIndex) => {
//             //     console.log(route)
//             //     console.log(index)
//             //     jumpToIndex(index)
//             // },
//         }
//     }
// );
//
// export const tabTask = createStackNavigator(
//     {
//         TaskListScreen: {screen: TaskListScreen},
//         // TaskScreen: {screen: TaskScreen},
//     },
//     {
//         headerMode: 'none',
//         navigationOptions: {
//             // tabBarOnPress: ({route, index}, jumpToIndex) => {
//             //     // console.log(this.props)
//             //     // this.props.toTaskListScreen()
//             // },
//         }
//     }
// );
//
// export const tabStatistics = createStackNavigator(
//     {
//         StatisticsScreen: {screen: StatisticsScreen},
//     },
//     {
//         headerMode: 'none',
//         navigationOptions: {}
//     }
// );
//
// export const tabSetting = createStackNavigator(
//     {
//         SettingScreen: {screen: SettingScreen},
//     },
//     {
//         headerMode: 'none',
//         navigationOptions: {}
//     }
// );
//
//
// export const RootTabs = createBottomTabNavigator(
//     {
//         TomatoTab: {
//             screen: tabTomato,
//             path: '/',
//             navigationOptions: {
//                 title: '',
//                 tabBarLabel: '番茄钟',
//                 header: null,
//                 tabBarIcon: ({focused, tintColor}) => (
//                     //   <Icon name="clock" size={20} color={tintColor}/>
//                     <Icon name="clock" size={20} color={tintColor} /*style={{marginBottom: 25}}*//> // iPhone X
//                 ),
//             },
//         },
//         TaskTab: {
//             screen: tabTask,
//             path: '/task',
//             navigationOptions: {
//                 title: "",
//                 tabBarLabel: '任务清单',
//                 tabBarIcon: ({focused, tintColor}) => (
//                     /*
//                     <Icon
//                         name='add-box'
//                         style={{color: tintColor, fontSize: 20}}
//                     />
//                     */
//
//                     <Icon name="list" style={{color: tintColor, fontSize: 20, /*marginBottom: 20*/}}/>
//                     // <Icon name="list" size={20} color={tintColor} style={{marginBottom: 30}}/>
//                 ),
//             },
//         },
//         StatisticsTab: {
//             screen: tabStatistics,
//             path: '/data',
//             navigationOptions: {
//                 title: "统计",
//                 tabBarLabel: '统计',
//                 tabBarIcon: ({focused, tintColor}) => (
//                     <Icon name="chart" size={20} color={tintColor} /*style={{margin: 10}}*//>
//                 ),
//             },
//         },
//         SettingTab: {
//             screen: tabSetting,
//             path: '/settings',
//             navigationOptions: {
//                 title: "设置",
//                 tabBarIcon: ({focused, tintColor}) => (
//                     // <Icon name="settings" size={20} color={tintColor}/>
//                     <Icon name="settings" size={20} color={tintColor}/>
//                 ),
//             },
//         },
//         // DemoTab: {
//         //     screen: DemoScreen,
//         // },
//     },
//     {
//         tabBarPosition: 'bottom',
//         lazy: true,
//         animationEnabled: false,
//         swipeEnabled: false,
//         initialRouteName: 'TomatoTab',
//         navigationOptions: {
//             headerTintColor: COLOR.textNormal,
//         },
//         tabBarOptions: {
//             showIcon: true,
//             showLabel: true,
//             // activeTintColor: COLOR.theme,
//             // activeBackgroundColor: COLOR.backgroundLighter,
//             // inactiveTintColor: COLOR.textEmpha,
//             // inactiveBackgroundColor: COLOR.backgroundDarker,
//             // style: {backgroundColor: COLOR.backgroundDarker},
//             // tabStyle: {paddingTop: 2, paddingBottom: 0, height:49},
//             // labelStyle: {fontSize: 12, marginTop: 0, marginBottom: 5}, // VIP 这个会导致 字上面的图标靠下
//         },
//     },
// );
//
//
// RootTabs.navigationOptions = ({ navigation, screenProps }) => {
//     const childOptions = getActiveChildNavigationOptions(navigation, screenProps);
//     return {
//         title: childOptions.title,
//     };
// };
//
// export const RootStack = createStackNavigator(
//     {
//         RootTabs: {screen: RootTabs},
//         // TasksTabs: {screen: TasksTabs},
//
//         CreateTask: {screen: CreateTaskScreen},
//         TaskListScreen4Select: {screen: TaskListScreen},
//         WebViewComponent: {screen: WebViewComponent},
//         TuCaoWebView: {
//             screen: TuCaoWebView,
//             path: '/tugecao/:url',
//         },
//
//         // Task: {screen: TaskScreen},
//         // TaskList: {screen: TaskList},
//         // TaskListItem: {screen: TaskListItem},
//     },
//     {
//         // headerMode: 'none', // hide this(Root) navigation bar
//         navigationOptions: {
//             // header: null,
//         },
//         headerTransitionPreset: 'uikit',
//         // You can leave this out if you don't want the card shadow to
//         // be visible through the header
//         // transitionConfig: () => ({
//         //     headerBackgroundInterpolator:
//         //     HeaderStyleInterpolator.forBackgroundWithTranslation,
//         // }),
//         defaultNavigationOptions: {
//             headerTransparent: true,
//             // headerStyle: {
//             //     borderBottomWidth: StyleSheet.hairlineWidth,
//             //     borderBottomColor: '#A7A7AA',
//             // },
//             // headerBackground: Platform.select({
//             //     ios: <View style={{flex: 1}}/>,
//             //     android: (
//             //         <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.7)'}}/>
//             //     ),
//             // }),
//         },
//     }
// );
//
//
// const AppNavigator = createAppContainer(RootStack);
//
// // class AppNavigator extends React.Component {
// //     render() {
// //         return (
// //             <RootStack navigation={addNavigationHelpers({
// //                 dispatch: this.props.dispatch,
// //                 state: this.props.nav,
// //             })}/>
// //         );
// //     }
// // }
//
// const mapStateToProps = (state) => ({
//     nav: state.reducerNavigator,
// });
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         toTaskListScreen: () => {
//             dispatch(toTaskScreen())
//         },
//     }
// };
//
//
// export default connect(mapStateToProps)(AppNavigator);
