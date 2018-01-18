/**
 *  功能：入口类
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import store from './store'
import AppNavigator from '../navigators/AppNavigator'
import Initialization from "../utils/Initialization";
import codePush from 'react-native-code-push'
import SplashScreen from 'react-native-splash-screen'

class PomodoroApp extends React.Component {

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
    }

    // CodePush
    codePushStatusDidChange(status) {
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

    codePushDownloadDidProgress(progress) {
        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
    }

    codePushOnBinaryVersionMismatch(update) {
        console.log("codePushOnBinaryVersionMismatch = " + JSON.stringify(update));
    }
}

// CodePush热更新
let options = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    updateDialog: true,
    installMode: codePush.InstallMode.IMMEDIATE
};
PomodoroApp = codePush(options)(PomodoroApp);

AppRegistry.registerComponent('PomodoroApp', () => PomodoroApp);
