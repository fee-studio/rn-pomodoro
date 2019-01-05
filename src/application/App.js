/**
 *  功能：入口类
 */

import React from 'react';
import {AppRegistry, AppState} from 'react-native';
import {Provider} from 'react-redux';
import store from './store'
import Initialization from "../utils/Initialization";
// todo 暂时停用 import codePush from 'react-native-code-push'
import SplashScreen from 'react-native-splash-screen'
import Utils from "../utils/Utils"
import AppContainer from "./AppContainer";


function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getActiveRouteName(route);
    }
    return route.routeName;
}

const appHandleNavigationChange = (prevState, currentState) => {
    const currentScreen = getActiveRouteName(currentState);
    const prevScreen = getActiveRouteName(prevState);
    console.log("navigation changed");
    if (prevScreen !== currentScreen) {
        // the line below uses the Google Analytics tracker
        // change the tracker here to use other Mobile analytics SDK.
        // tracker.trackScreenView(currentScreen);
    }
}

class PomodoroApp extends React.Component {

    state = {
        // appState: AppState.currentState
    }

    constructor(props) {
        super(props);

        // 初始化数据
        new Initialization()

        console.log("fengyiyi")
    }

    render() {
        return (
            <Provider store={store}>
                {/*<AppNavigator/>*/}
                <AppContainer
                    // onNavigationStateChange={appHandleNavigationChange} // todo 学习这个怎么用
                    uriPrefix="/app"
                    // ref={nav => {
                    //     this.navigator = nav;
                    //                    }}
                />
            </Provider>
        )
    }

    componentDidMount() {
        SplashScreen.hide();
        // AppState.addEventListener('change', this._handleAppStateChange);
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
        // AppState.removeEventListener('change', this._handleAppStateChange);
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

    static handleNavigationChange() {
        console.log("handleNavigationChange called");
    };

    /* todo 暂时停用
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
    */
}

/* todo 暂时停用
// CodePush热更新
let options = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    updateDialog: true,
    installMode: codePush.InstallMode.ON_NEXT_RESTART
};
PomodoroApp = codePush(options)(PomodoroApp);
*/

AppRegistry.registerComponent('PomodoroApp', () => PomodoroApp);
