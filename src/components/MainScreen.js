/**
 *  作者：冯夷夷
 *  功能：
 */

import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation'
import TomatoScreen from './TomatoScreen'
import TaskScreen, {TaskList, TaskListItem} from './TaskScreen'
import StatisticsScreen from './StatisticsScreen'
import SettingScreen from './SettingScreen'
import {RealmDemo} from "../database/RealmDemo";
import CreateTaskScreen from "./CreateTaskScreen";
import {TaskStateTitle} from "../utils/GlobalData";


const RootTabs = TabNavigator(
    {
        TomatoTab: {
            screen: TomatoScreen,
            /*
            path: '/',
            navigationOptions: {
                title: 'Welcome',
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-home' : 'ios-home-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            },
            */
        },
        TaskTab: {
            screen: TaskScreen,
        },
        StatisticsTab: {
            screen: StatisticsScreen,
        },
        SettingTab: {
            screen: SettingScreen,
        },
        // RealmTest: {
        //     screen: RealmDemo,
        // },
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        initialRouteName: 'TomatoTab', // todo...
        navigationOptions: {
            headerTintColor: '#333',
        },
    }
);


export const StacksOverTabs = StackNavigator(
    {
        RootTabs: {screen: RootTabs},
        // TasksTabs: {screen: TasksTabs},

        CreateTask: {screen: CreateTaskScreen},

        // Task: {screen: TaskScreen},
        // TaskList: {screen: TaskList},
        // TaskListItem: {screen: TaskListItem},
    },
);