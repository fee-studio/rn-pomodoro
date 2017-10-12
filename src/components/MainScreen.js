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


const TabNav = TabNavigator(
    {
        PomodoroTab: {
            screen: PomodoroScreen,
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
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);


export const StacksOverTabs = StackNavigator(
    {
        Root: {
            screen: TabNav,
        }
    }
);