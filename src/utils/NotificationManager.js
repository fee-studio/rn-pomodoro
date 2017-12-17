const PushNotification = require('react-native-push-notification');


export default class NotificationManager {

    static initNotification() {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('NOTIFICATION TOKEN:', token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
                alert('NOTIFICATION: ' + JSON.stringify(notification));
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

    static setupMorningEveningNotice() {
        this.setupMorningNotice();
        this.setupEveningNotice();
    }

    static setupMorningNotice() {
        let date = new Date();
        let date9 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9);

        PushNotification.localNotificationSchedule({
            id: "rn_notice_morning_9",
            message: "My Notification Message11", // (required)
            date: date9,
            repeatType: "day",
        });
    }

    static setupEveningNotice() {
        let date = new Date();
        let date21 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9);

        PushNotification.localNotificationSchedule({
            id: "rn_notice_evening_9",
            message: "My Notification Message", // (required)
            date: date21,
            repeatType: "day",
        });
    }

    static removeMorningEveningNotice() {
        PushNotification.cancelLocalNotifications({id: 'rn_notice_morning_9'});
        PushNotification.cancelLocalNotifications({id: 'rn_notice_evening_9'});
    }

    static removeAllNotices() {
        PushNotification.cancelAllLocalNotifications();
    }





}