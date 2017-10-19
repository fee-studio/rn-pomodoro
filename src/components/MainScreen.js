/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {Component} from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation'
import {PomodoroScreen} from './PomodoroScreen'
import TaskScreen from './TaskScreen'
import StatisticsScreen from './StatisticsScreen'
import SettingScreen from './SettingScreen'
import {RealmDemo} from "../database/RealmDemo";
import CreateTaskScreen from "./CreateTaskScreen";


const TabNav = TabNavigator(
    {
        PomodoroTab: {
            screen: PomodoroScreen,
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
        RealmTest: {
            screen: RealmDemo,
        },
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        initialRouteName:'TaskTab', // todo...
        navigationOptions: {
            headerTintColor: '#333',
        },
    }
);


export const StacksOverTabs = StackNavigator(
    {
        Root: {screen: TabNav},
        CreateTask:{screen:CreateTaskScreen},
    },

);