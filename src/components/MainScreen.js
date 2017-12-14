/**
 *  作者：冯夷夷
 *  功能：
 */

import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation'
import TomatoScreen from './tomato/TomatoScreen'
import TaskScreen, {TaskList, TaskListItem} from './task/TaskScreen'
import StatisticsScreen from './statistics/StatisticsScreen'
import SettingScreen from './setting/SettingScreen'
import {RealmDemo} from "../database/RealmDemo";
import CreateTaskScreen from "./task/CreateTaskScreen";
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