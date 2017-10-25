/**
 *  功能：
 */

import realm, {TomatoConfig} from '../database/RealmDB'

export default class Initialization {


    static initTomatoConfig() {
        let defaultTomatoConfig = null;
        let configs = realm.objects('TomatoConfig').filtered('index = 1');
        if (configs.length >= 1) {
            defaultTomatoConfig = configs[0];
            return defaultTomatoConfig;
        } else {
            /*
            let config = new TomatoConfig();
            config.index = 1;
            config.shortRestDuring = 5 * 60;
            config.longRestDuring = 15 * 60;
            config.workDuring = 25 * 60;
            config.longRestInterval = 4;
            config.dailyTargetCount = 8;
            config.isRingHint = true;
            config.isShakeHint = true;
            config.isStartSelectTask = true;
            config.showToDoCount = true;
            config.notice4MorningEvening = true;
            */

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