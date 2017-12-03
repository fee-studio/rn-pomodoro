/**
 *  功能：
 */

import React, {Component} from 'react'
import {addNavigationHelpers, StackNavigator, TabNavigator} from 'react-navigation'
import TomatoScreen from '../components/TomatoScreen'
import TaskScreen from '../components/TaskScreen'
import StatisticsScreen from '../components/StatisticsScreen'
import SettingScreen from '../components/SettingScreen'
import CreateTaskScreen from "../components/CreateTaskScreen";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {COLOR} from "../config/Config";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import TaskListScreen from "../components/TaskListScreen";
import TuCaoWebView from "../components/TuCaoWebView";
import WebViewComponent from "../components/common/WebViewComponent";
import {toTaskScreen} from "./actions";
import DemoScreen from "../components/DemoScreen";
import ComponentTemplete from "../other/ComponentTemplate";
// import Icon from 'react-native-vector-icons/Entypo';

export const tabTomato = StackNavigator(
    {
        TomatoScreen: {screen: TomatoScreen},
    },
    {
        navigationOptions: {
            title: "番茄钟",
            header: null,
            tabBarIcon: ({focused, tintColor}) => (
                //   <Icon name="clock" size={20} color={tintColor}/>
                <Icon name="clock" size={20} color={tintColor} /*style={{marginBottom: 25}}*//> // iPhone X
            ),

            // tabBarOnPress: ({route, index}, jumpToIndex) => {
            //     console.log(route)
            //     console.log(index)
            //     jumpToIndex(index)
            // },
        }
    }
);

export const tabTask = StackNavigator(
    {
        TaskListScreen: {screen: TaskListScreen},
        // TaskScreen: {screen: TaskScreen},
    },
    {
        headerMode: 'none',
        navigationOptions: {
            title: "任务清单",
            headerMode: 'none',
            tabBarIcon: ({focused, tintColor}) => (
                /*
                <Icon
                    name='add-box'
                    style={{color: tintColor, fontSize: 20}}
                />
                */

                <Icon name="list" style={{color: tintColor, fontSize: 20, /*marginBottom: 20*/}}/>
                // <Icon name="list" size={20} color={tintColor} style={{marginBottom: 30}}/>
            ),
            // tabBarOnPress: ({route, index}, jumpToIndex) => {
            //     // console.log(this.props)
            //     // this.props.toTaskListScreen()
            // },
        }
    }
);

export const tabStatistics = StackNavigator(
    {
        StatisticsScreen: {screen: StatisticsScreen},
    },
    {
        headerMode: 'none',
        navigationOptions: {
            title: "统计",
            tabBarIcon: ({focused, tintColor}) => (
                <Icon name="chart" size={20} color={tintColor} /*style={{margin: 10}}*//>
            ),
        }
    }
);

export const tabSetting = StackNavigator(
    {
        SettingScreen: {screen: SettingScreen},
    },
    {
        headerMode: 'none',
        navigationOptions: {
            title: "设置",
            headerMode: 'none',
            tabBarIcon: ({focused, tintColor}) => (
                // <Icon name="settings" size={20} color={tintColor}/>
                <Icon name="settings" size={20} color={tintColor}/>
            ),
        }
    }
);


export const RootTabs = TabNavigator(
    {
        TomatoTab: {
            screen: tabTomato,
        },
        TaskTab: {
            screen: tabTask,
        },
        StatisticsTab: {
            screen: tabStatistics,
        },
        SettingTab: {
            screen: tabSetting,
        },
        DemoTab: {
            screen: ComponentTemplete,
        },
    },
    {
        tabBarPosition: 'bottom',
        lazy: true,
        animationEnabled: false,
        swipeEnabled: false,
        initialRouteName: 'TaskTab', // todo...
        navigationOptions: {
            headerTintColor: '#333',
        },
        tabBarOptions: {
            // activeTintColor: COLOR.theme,
            // activeBackgroundColor: COLOR.backgroundLighter,
            // inactiveTintColor: COLOR.textEmpha,
            // inactiveBackgroundColor: COLOR.backgroundDarker,
            showIcon: true,
            showLabel: true,
            // style: {backgroundColor: COLOR.backgroundDarker},
            // tabStyle: {paddingTop: 2, paddingBottom: 0},
            // labelStyle: {fontSize: 12, marginTop: 0, marginBottom: 5}, // VIP 这个会导致 字上面的图标靠下
        },
    }
);


export const RootStack = StackNavigator(
    {
        RootTabs: {screen: RootTabs},
        // TasksTabs: {screen: TasksTabs},

        CreateTask: {screen: CreateTaskScreen},
        TaskListScreen4Select: {screen: TaskListScreen},
        WebViewComponent: {screen: WebViewComponent},
        TuCaoWebView: {screen: TuCaoWebView},

        // Task: {screen: TaskScreen},
        // TaskList: {screen: TaskList},
        // TaskListItem: {screen: TaskListItem},
    },
    {
        navigationOptions: {
            // header: null,
        }
    }
);


class AppNavigator extends React.Component {
    render() {
        return (
            <RootStack navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })}/>
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.reducerNavigator,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toTaskListScreen: () => {
            dispatch(toTaskScreen())
        },
    }
};


export default connect(mapStateToProps)(AppNavigator);
