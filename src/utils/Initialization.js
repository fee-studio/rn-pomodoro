/**
 *  功能：
 */

import realm, {TomatoConfig} from '../database/RealmDB'
import GlobalData, {TaskState} from "./GlobalData";
import {DEBUG} from "./Config";
import TomatoService from "../database/TomatoService";
import RealmDBService from "../database/RealmDBService";
import NotificationManager from "./NotificationManager";
import TaskService from "../database/TaskService";
import PushNotification from "react-native-push-notification";
import StorageManager, {AppFirstLaunch4SettingConfig} from "./StorageManager";

export default class Initialization {

    constructor() {
        // GlobalData.tomatoConfig = Initialization.initTomatoConfig();

        // NotificationManager.removeAllNotices();

        StorageManager.initStorage();

        NotificationManager.initNotification();


        this.initSettingConfig();

        this.initMockData4Task();
        this.initMockData4Tomato();

        // 启动服务
        RealmDBService.start();

    }

    // todo 只能是App首次启动是才执行
    initSettingConfig() {
        // GlobalData.storage.remove({key: 'AppFirstLaunch4SettingConfig'});

        StorageManager.storage.load({
            key: AppFirstLaunch4SettingConfig
        }).then(result => {
            if (result === 'didLaunch') {
            }
        }).catch(error => {
            // 桌面图标为今日待办数
            let count = 0
            if (GlobalData.tomatoConfig.showTodoCount) {
                count = TaskService.read(TaskState.TaskStateTodo).length;
            }
            PushNotification.setApplicationIconBadgeNumber(count);

            // 早9晚9
            if (GlobalData.tomatoConfig.notice4MorningEvening) {
                NotificationManager.setupMorningEveningNotice();
            } else {
                NotificationManager.removeMorningEveningNotice();
            }

            // 做标记
            GlobalData.storage.save({
                key: AppFirstLaunch4SettingConfig,
                data: 'didLaunch',
            });
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
        ];

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

    initMockData4Tomato() {
        let mockData = [
            {
                id: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
                deleted: false,
                startTime: new Date(),
                endTime: new Date(),
                isInterrupt: false,
                state: 4,
                type: 1,
                duration: 300,
                // curTask: {}
            },
            {
                id: '2',
                createdAt: new Date(),
                updatedAt: new Date(),
                deleted: false,
                startTime: new Date(),
                endTime: new Date(),
                isInterrupt: false,
                state: 4,
                type: 1,
                duration: 300,
                // curTask: {}
            },
            {
                id: '3',
                createdAt: new Date(),
                updatedAt: new Date(),
                deleted: false,
                startTime: new Date(),
                endTime: new Date(),
                isInterrupt: false,
                state: 4,
                type: 1,
                duration: 300,
                // curTask: {}
            },
            {
                id: '4',
                createdAt: new Date(),
                updatedAt: new Date(),
                deleted: false,
                startTime: new Date(),
                endTime: new Date(),
                isInterrupt: false,
                state: 4,
                type: 1,
                duration: 300,
                // curTask: {}
            },
            {
                id: '5',
                createdAt: new Date(),
                updatedAt: new Date(),
                deleted: false,
                startTime: new Date(),
                endTime: new Date(),
                isInterrupt: false,
                state: 4,
                type: 1,
                duration: 300,
                // curTask: {}
            },
        ];

        let allTomatoes = realm.objects('Tomato');
        realm.write(() => {
            realm.delete(allTomatoes);
        });

        // create data
        for (let data of mockData) {
            TomatoService.create(data);
        }
    }


}