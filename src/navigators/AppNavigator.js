/**
 *  功能：
 */

import React from 'react';
import {addNavigationHelpers, StackNavigator, TabNavigator} from 'react-navigation'
import PomodoroScreen from '../components/PomodoroScreen'
import TaskScreen from '../components/TaskScreen'
import StatisticsScreen from '../components/StatisticsScreen'
import SettingScreen from '../components/SettingScreen'
import CreateTaskScreen from "../components/CreateTaskScreen";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {COLOR} from "../config/Config";


export const tabTomato = StackNavigator(
    {
        TomatoScreen: {screen: PomodoroScreen},
    },
    {
        navigationOptions: {
            title: "番茄钟",
            header: null,
        }
    }
);

export const tabTask = StackNavigator(
    {
        TaskScreen: {screen: TaskScreen},
        // CreateTask: {screen: CreateTaskScreen},
    },
    {
        navigationOptions: {
            title: "任务清单",
        }
    }
);

export const tabStatistics = StackNavigator(
    {
        StatisticsScreen: {screen: StatisticsScreen},
    },
    {
        navigationOptions: {
            title: "统计",
        }
    }
);

export const tabSetting = StackNavigator(
    {
        SettingScreen: {screen: SettingScreen},
    },
    {
        navigationOptions: {
            title: "设置",
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
        // RealmTest: {
        //     screen: RealmDemo,
        // },
    },
    {
        tabBarPosition: 'bottom',
        lazy: true,
        animationEnabled: false,
        swipeEnabled: false,
        initialRouteName: 'TomatoTab', // todo...
        navigationOptions: {
            headerTintColor: '#333',
            header: null,
        },
        tabBarOptions: {
            // activeTintColor: COLOR.theme,
            // activeBackgroundColor: COLOR.backgroundLighter,
            // inactiveTintColor: COLOR.textEmpha,
            // inactiveBackgroundColor: COLOR.backgroundDarker,
            showIcon: true,
            showLabel: true,
            // style: {backgroundColor: COLOR.backgroundDarker},
            tabStyle: {paddingTop: 2, paddingBottom: 0},
            labelStyle: {fontSize: 12, marginTop: 0, marginBottom: 5}
        },
        // headerMode: 'none'
    }
);


export const RootStack = StackNavigator(
    {
        RootTabs: {screen: RootTabs},
        // TasksTabs: {screen: TasksTabs},

        CreateTask: {screen: CreateTaskScreen},

        // Task: {screen: TaskScreen},
        // TaskList: {screen: TaskList},
        // TaskListItem: {screen: TaskListItem},
    },
    {
        navigationOptions: {}
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

// Application.propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     nav: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppNavigator);
