/**
 *  作者：冯夷夷
 *  功能：
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {StacksOverTabs, TabNav} from './components/MainScreen'
import {myDataTest} from "./database/Task";


class PomodoroApp extends Component {

    constructor(props) {
        super(props);

        console.log("feng");
        // myDataTest();
        console.log("yiyi");
        console.log("yiyi");
    }

    render() {
        return (
            <StacksOverTabs/>
        )
    }
}

AppRegistry.registerComponent('PomodoroApp', () => PomodoroApp);
