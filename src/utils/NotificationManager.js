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
                // alert('NOTIFICATION: ' + JSON.stringify(notification));
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

        // PushNotification.checkPermissions((results)=>{
        //     if (results.alert === 0 && results.sound === 0 && results.badge === 0) {
        //
        //     } else {
        //         this.setupMorningNotice();
        //         this.setupEveningNotice();
        //     }
        // });
    }

    static setupMorningNotice() {
        let date = new Date();
        let date9 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9);

        PushNotification.localNotificationSchedule({
            id: "9527", // 原rn_notice_morning_9  Android需要数字型
            message: "整理下今天的清单，开始有进步的一天吧", // (required)
            date: date9,
            repeatType: "day",
        });
    }

    static setupEveningNotice() {
        let date = new Date();
        let date21 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9);

        PushNotification.localNotificationSchedule({
            id: "9528", // 原rn_notice_evening_9  Android需要数字型
            message: "不早了，检查下今天的完成情况吧", // (required)
            date: date21,
            repeatType: "day",
        });
    }

    static removeMorningEveningNotice() {
        PushNotification.cancelLocalNotifications({id: '9527'});
        PushNotification.cancelLocalNotifications({id: '9528'});
    }

    static removeAllNotices() {
        PushNotification.cancelAllLocalNotifications();
    }





}