/**
 *  功能：入口类
 */

import React from 'react';
import {AppRegistry, AppState} from 'react-native';
import {Provider} from 'react-redux';
import store from './store'
import AppNavigator from '../navigators/AppNavigator'
import Initialization from "../utils/Initialization";
import codePush from 'react-native-code-push'
import SplashScreen from 'react-native-splash-screen'
import Utils from "../utils/Utils"

class PomodoroApp extends React.Component {

    state = {
        appState: AppState.currentState
    }

    constructor(props) {
        super(props);

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

    componentDidMount() {
        SplashScreen.hide();
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState});

        console.log(`Current state is: ${this.state.appState}`);

        // 设置桌面图标
        if (this.state.appState.match(/inactive|background/)) {
            Utils.setupApplicationIconBadgeNumber();
        }
    };

    // CodePush
    static codePushStatusDidChange(status) {
        switch (status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Checking for updates.");
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Downloading package.");
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                console.log("Installing update.");
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                console.log("Up-to-date.");
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                console.log("Update installed.");
                break;
        }
    }

    static codePushDownloadDidProgress(progress) {
        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
    }

    static codePushOnBinaryVersionMismatch(update) {
        console.log("codePushOnBinaryVersionMismatch = " + JSON.stringify(update));
    }
}

// CodePush热更新
let options = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    updateDialog: true,
    installMode: codePush.InstallMode.ON_NEXT_RESTART
};
PomodoroApp = codePush(options)(PomodoroApp);

AppRegistry.registerComponent('PomodoroApp', () => PomodoroApp);
