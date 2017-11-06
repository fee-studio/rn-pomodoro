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

class PomodoroApp extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('PomodoroApp', () => PomodoroApp);
