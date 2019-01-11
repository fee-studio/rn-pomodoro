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
import MockDataManager from "./MockDataManager";
import Utils from "./Utils"

export default class Initialization {

    constructor() {
        // GlobalData.tomatoConfig = Initialization.initTomatoConfig();

        // NotificationManager.removeAllNotices();

        StorageManager.initStorage();

        NotificationManager.initNotification();

        this.initSettingConfig();

        if (DEBUG) {
            MockDataManager.initMockData();
        }

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
            Utils.setupApplicationIconBadgeNumber();

            // 早9晚9
            if (GlobalData.tomatoConfig.notice4MorningEvening) {
                NotificationManager.setupMorningEveningNotice();
            } else {
                NotificationManager.removeMorningEveningNotice();
            }

            // 做标记
            StorageManager.storage.save({
                key: AppFirstLaunch4SettingConfig,
                data: 'didLaunch',
            });
        });

    }

}