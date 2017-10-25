/**
 *  作者：冯夷夷
 *  功能：
 */


import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {StacksOverTabs} from './components/MainScreen';


class PomodoroApp extends React.Component {
    render() {
        return (
            <StacksOverTabs/>
        )
    }
}

AppRegistry.registerComponent('PomodoroApp', () => PomodoroApp);
