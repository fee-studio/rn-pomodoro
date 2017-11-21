/**
 *  功能：
 */

import realm, {TomatoConfig} from '../database/RealmDB'
import GlobalData from "./GlobalData";
import {DEBUG} from "./Config";

export default class Initialization {

    constructor() {
        // GlobalData.defaultTomatoConfig = Initialization.initTomatoConfig();

    }

    static initTomatoConfig() {
        console.log("default realm database path = " + realm.path)

        if (DEBUG) {
            let index = 1;
            let shortRestDuring = 5 * 60;
            let longRestDuring = 15 * 60;
            let workDuring = 3; // todo
            let longRestInterval = 4;
            let dailyTargetCount = 8;
            let isRingHint = true;
            let isShakeHint = true;
            let isStartSelectTask = true;
            let showToDoCount = true;
            let notice4MorningEvening = true;

            return {
                index,
                shortRestDuring,
                longRestDuring,
                workDuring,
                longRestInterval,
                dailyTargetCount,
                isRingHint,
                isShakeHint,
                isStartSelectTask,
                showToDoCount,
                notice4MorningEvening,
            }
        }

        let defaultTomatoConfig = null;
        let configs = realm.objects('TomatoConfig').filtered('index = 1');
        if (configs.length >= 1) {
            defaultTomatoConfig = configs[0];
            return defaultTomatoConfig;
        } else {
            let index = 1;
            let shortRestDuring = 5 * 60;
            let longRestDuring = 15 * 60;
            let workDuring = 25 * 60;
            let longRestInterval = 4;
            let dailyTargetCount = 8;
            let isRingHint = true;
            let isShakeHint = true;
            let isStartSelectTask = true;
            let showToDoCount = true;
            let notice4MorningEvening = true;

            realm.write(() => {
                return defaultTomatoConfig = realm.create('TomatoConfig', {
                    index,
                    shortRestDuring,
                    longRestDuring,
                    workDuring,
                    longRestInterval,
                    dailyTargetCount,
                    isRingHint,
                    isShakeHint,
                    isStartSelectTask,
                    showToDoCount,
                    notice4MorningEvening,
                })
            })
        }
    }


}