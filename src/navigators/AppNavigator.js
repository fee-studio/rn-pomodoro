/**
 *  功能：
 */

import React from 'react'
import {addNavigationHelpers, StackNavigator, TabNavigator} from 'react-navigation'
import PomodoroScreen from '../components/PomodoroScreen'
import TaskScreen from '../components/TaskScreen'
import StatisticsScreen from '../components/StatisticsScreen'
import SettingScreen from '../components/SettingScreen'
import CreateTaskScreen from "../components/CreateTaskScreen";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {COLOR} from "../config/Config";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import TaskListScreen from "../components/TaskListScreen";
// import Icon from 'react-native-vector-icons/Entypo';

export const tabTomato = StackNavigator(
    {
        TomatoScreen: {screen: PomodoroScreen},
    },
    {
        navigationOptions: {
            title: "番茄钟",
            header: null,
            tabBarIcon: ({focused, tintColor}) => (
                //   <Icon name="clock" size={20} color={tintColor}/>
                <Icon name="clock" size={20} color={tintColor} style={{marginBottom: 25}}/> // iPhone X
            ),
        }
    }
);

export const tabTask = StackNavigator(
    {
        TaskScreen: {screen: TaskListScreen},
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
                <Icon name="list" style={{color: tintColor, fontSize: 20, marginBottom: 25}}/>
                // <Icon name="list" size={20} color={tintColor} style={{marginBottom: 30}}/>
            ),
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
                //  <Icon name="chart" size={20} color={tintColor}/>
                <Icon name="chart" size={20} color={tintColor} style={{marginBottom: 25}}/>
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
                <Icon name="settings" size={20} color={tintColor} style={{marginBottom: 25}}/>
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
            tabStyle: {paddingTop: 2, paddingBottom: 0},
            labelStyle: {fontSize: 12, marginTop: 0, marginBottom: 5}
        },
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

// Application.propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     nav: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppNavigator);
