/**
 *  功能：
 */

/**
 *  作者：冯夷夷
 *  功能：
 */

import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import {Provider} from 'react-redux';
import store from './store'
import AppNavigator from '../navigators/AppNavigator'
import Initialization from "../config/Initialization";

class PomodoroApp extends React.Component {

    constructor(props) {
        super(props)

        // 初始化数据
        new Initialization()

    }


    render() {
        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('PomodoroApp', () => PomodoroApp);
