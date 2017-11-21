/**
 *  功能：
 */

import realm, {TomatoConfig} from '../database/RealmDB'
import GlobalData from "./GlobalData";
import {DEBUG} from "./Config";
// import PushNotification from "react-native-push-notification";

const PushNotification = require('react-native-push-notification');

export default class Initialization {

    constructor() {
        // GlobalData.defaultTomatoConfig = Initialization.initTomatoConfig();

        this.initNotification();

    }

    initNotification() {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('TOKEN:', token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
            },

            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "YOUR GCM SENDER ID",

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true,
        });
    }
}