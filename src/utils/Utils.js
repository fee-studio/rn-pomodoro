import {TaskState} from "./GlobalData"
import GlobalData from "./GlobalData"
import TaskService from "../database/TaskService"
import PushNotification from "react-native-push-notification"
import {getStatusBarHeight, isIphoneX} from "react-native-iphone-x-helper";
import {
    Header,
} from 'react-navigation';
import {
    Dimensions,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

export default class Utils {

    constructor() {

    }

    formatDate4TaskList(date: Date) {
        let aDate = date.getFullYear() + "-"
            + date.getMonth() + "-"
            + date.getDate() + " "
            + date.getDay()
    }

    static setupApplicationIconBadgeNumber() {
        let count = 0
        if (GlobalData.tomatoConfig.showTodoCount) {
            count = TaskService.read(TaskState.TaskStateTodo).length;
        }
        PushNotification.setApplicationIconBadgeNumber(count);
    }

    static getHeaderInset() {
        const NOTCH_HEIGHT = isIphoneX() ? 25 : 0;

        // $FlowIgnore: we will remove the HEIGHT static soon enough
        const BASE_HEADER_HEIGHT = Header.HEIGHT;

        const HEADER_HEIGHT = BASE_HEADER_HEIGHT;
        // const HEADER_HEIGHT = BASE_HEADER_HEIGHT + getStatusBarHeight();

        // const HEADER_HEIGHT =
        //     Platform.OS === 'ios'
        //         ? BASE_HEADER_HEIGHT + NOTCH_HEIGHT
        //         : BASE_HEADER_HEIGHT + getStatusBarHeight()

        return Platform.select({
            ios: {
                // contentInset: {top: HEADER_HEIGHT},
                // contentOffset: {y: -HEADER_HEIGHT},
                paddingTop: HEADER_HEIGHT,
            },
            android: {
                // contentContainerStyle: {
                paddingTop: HEADER_HEIGHT,
                // },

            },
        });
    }
}