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

        this.initNotification()
        this.initMockData4Task()

    }

    initNotification() {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('NOTIFICATION TOKEN:', token);
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

    initMockData4Task() {
        const today = new Date()

        let today20171130 = new Date()
        today20171130.setFullYear(2017, 11, 30)

        let today20171111 = new Date()
        today20171111.setFullYear(2017, 11, 11)


        const mockData = [
            {
                id: '0',
                taskName: '0，风格发11',
                isRemind: true, deleted: false,
                createdAt: today,
                updatedAt: new Date(),
                actionTime: new Date(),
                remindTime: new Date(),
                status: 1,
                tomatoes: []
            },
            {
                id: '1',
                taskName: '1，番茄钟11',
                isRemind: true, deleted: false,
                createdAt: today,
                updatedAt: new Date(),
                actionTime: new Date(),
                remindTime: new Date(),
                status: 1,
                tomatoes: []
            },
            {
                id: '2',
                taskName: '2，休息时11',
                isRemind: true, deleted: false,
                createdAt: today,
                updatedAt: new Date(),
                actionTime: new Date(),
                remindTime: new Date(),
                status: 1,
                tomatoes: []
            },
            {
                id: '3',
                taskName: '3，开启番11',
                isRemind: true, deleted: false,
                createdAt: today,
                updatedAt: new Date(),
                actionTime: new Date(),
                remindTime: new Date(),
                status: 1,
                tomatoes: []
            },
            {
                id: '4',
                taskName: '4，当然了11',
                isRemind: true, deleted: false,
                createdAt: today,
                updatedAt: new Date(),
                actionTime: new Date(),
                remindTime: new Date(),
                status: 1,
                tomatoes: []
            },
            {
                id: '5',
                taskName: '5，可以添11',
                isRemind: true, deleted: false,
                createdAt: today,
                updatedAt: new Date(),
                actionTime: new Date(),
                remindTime: new Date(),
                status: 1,
                tomatoes: []
            },
            {
                id: '6',
                taskName: '6，向左滑11',
                isRemind: true, deleted: false,
                createdAt: today,
                updatedAt: new Date(),
                actionTime: new Date(),
                remindTime: new Date(),
                status: 1,
                tomatoes: []
            },
            {
                id: '7',
                taskName: '7，今日标11',
                isRemind: true, deleted: false,
                createdAt: today,
                updatedAt: new Date(),
                actionTime: new Date(),
                remindTime: new Date(),
                status: 1,
                tomatoes: []
            },
            {
                id: '8',
                taskName: '8，未来哈11',
                isRemind: true, deleted: false,
                createdAt: today,
                updatedAt: new Date(),
                actionTime: new Date(),
                remindTime: new Date(),
                status: 1,
                tomatoes: []
            },
            {
                id: '9',
                taskName: '9，任务每11',
                isRemind: true, deleted: false,
                createdAt: today,
                updatedAt: new Date(),
                actionTime: new Date(),
                remindTime: new Date(),
                status: 1,
                tomatoes: []
            },

            {
                id: '10',
                taskName: '0，风格发22',
                isRemind: true, deleted: false,
                createdAt: today20171130,
                updatedAt: new Date(),
                actionTime: today20171130,
                remindTime: today20171130,
                status: 2,
                tomatoes: []
            },
            {
                id: '11',
                taskName: '1，番茄钟22',
                isRemind: true, deleted: false,
                createdAt: today20171130,
                updatedAt: new Date(),
                actionTime: today20171130,
                remindTime: today20171130,
                status: 2,
                tomatoes: []
            },
            {
                id: '12',
                taskName: '2，休息时22',
                isRemind: true, deleted: false,
                createdAt: today20171130,
                updatedAt: new Date(),
                actionTime: today20171130,
                remindTime: today20171130,
                status: 2,
                tomatoes: []
            },
            {
                id: '13',
                taskName: '3，开启番22',
                isRemind: true, deleted: false,
                createdAt: today20171130,
                updatedAt: new Date(),
                actionTime: today20171130,
                remindTime: today20171130,
                status: 2,
                tomatoes: []
            },
            {
                id: '14',
                taskName: '4，当然了22',
                isRemind: true, deleted: false,
                createdAt: today20171130,
                updatedAt: new Date(),
                actionTime: today20171130,
                remindTime: today20171130,
                status: 2,
                tomatoes: []
            },
            {
                id: '15',
                taskName: '5，可以添22',
                isRemind: true, deleted: false,
                createdAt: today20171130,
                updatedAt: new Date(),
                actionTime: today20171130,
                remindTime: today20171130,
                status: 2,
                tomatoes: []
            },
            {
                id: '16',
                taskName: '6，向左滑22',
                isRemind: true, deleted: false,
                createdAt: today20171130,
                updatedAt: new Date(),
                actionTime: today20171130,
                remindTime: today20171130,
                status: 2,
                tomatoes: []
            },
            {
                id: '17',
                taskName: '7，今日标22',
                isRemind: true, deleted: false,
                createdAt: today20171130,
                updatedAt: new Date(),
                actionTime: today20171130,
                remindTime: today20171130,
                status: 2,
                tomatoes: []
            },
            {
                id: '18',
                taskName: '8，未来哈22',
                isRemind: true, deleted: false,
                createdAt: today20171130,
                updatedAt: new Date(),
                actionTime: today20171130,
                remindTime: today20171130,
                status: 2,
                tomatoes: []
            },
            {
                id: '19',
                taskName: '9，任务每22',
                isRemind: true, deleted: false,
                createdAt: today20171130,
                updatedAt: new Date(),
                actionTime: today20171130,
                remindTime: today20171130,
                status: 2,
                tomatoes: []
            },

            {
                id: '20',
                taskName: '0，风格发33',
                isRemind: true, deleted: false,
                createdAt: today20171111,
                updatedAt: new Date(),
                actionTime: today20171111,
                remindTime: today20171111,
                status: 3,
                tomatoes: []
            },
            {
                id: '21',
                taskName: '1，番茄钟33',
                isRemind: true, deleted: false,
                createdAt: today20171111,
                updatedAt: new Date(),
                actionTime: today20171111,
                remindTime: today20171111,
                status: 3,
                tomatoes: []
            },
            {
                id: '22',
                taskName: '2，休息时33',
                isRemind: true, deleted: false,
                createdAt: today20171111,
                updatedAt: new Date(),
                actionTime: today20171111,
                remindTime: today20171111,
                status: 3,
                tomatoes: []
            },
            {
                id: '23',
                taskName: '3，开启番33',
                isRemind: true, deleted: false,
                createdAt: today20171111,
                updatedAt: new Date(),
                actionTime: today20171111,
                remindTime: today20171111,
                status: 3,
                tomatoes: []
            },
            {
                id: '24',
                taskName: '4，当然了33',
                isRemind: true, deleted: false,
                createdAt: today20171111,
                updatedAt: new Date(),
                actionTime: today20171111,
                remindTime: today20171111,
                status: 3,
                tomatoes: []
            },
            {
                id: '25',
                taskName: '5，可以添33',
                isRemind: true, deleted: false,
                createdAt: today20171111,
                updatedAt: new Date(),
                actionTime: today20171111,
                remindTime: today20171111,
                status: 3,
                tomatoes: []
            },
            {
                id: '26',
                taskName: '6，向左滑33',
                isRemind: true, deleted: false,
                createdAt: today20171111,
                updatedAt: new Date(),
                actionTime: today20171111,
                remindTime: today20171111,
                status: 3,
                tomatoes: []
            },
            {
                id: '27',
                taskName: '7，今日标33',
                isRemind: true, deleted: false,
                createdAt: today20171111,
                updatedAt: new Date(),
                actionTime: today20171111,
                remindTime: today20171111,
                status: 3,
                tomatoes: []
            },
            {
                id: '28',
                taskName: '8，未来哈33',
                isRemind: true, deleted: false,
                createdAt: today20171111,
                updatedAt: new Date(),
                actionTime: today20171111,
                remindTime: today20171111,
                status: 3,
                tomatoes: []
            },
            {
                id: '29',
                taskName: '9，任务每33',
                isRemind: true, deleted: false,
                createdAt: today20171111,
                updatedAt: new Date(),
                actionTime: today20171111,
                remindTime: today20171111,
                status: 3,
                tomatoes: []
            },

        ]

        realm.write(() => {
            // deletes all tasks
            let allTasks = realm.objects('Task');
            realm.delete(allTasks);

            // create data
            // for (let data of mockData) {
            //     realm.create('Task', data);
            // }
        });

        // create data
        for (let data of mockData) {
            realm.write(() => {
                realm.create('Task', data);  // todo 为什么这里添加的数据 delete 就会出错? 怪怪
            });
        }


    }
}