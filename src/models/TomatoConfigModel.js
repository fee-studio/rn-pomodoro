/**
 *  功能：
 */
import realm, {TomatoConfig} from '../database/RealmDB'


export const devDbData = {
    index: 0,
    shortRestDuring: 5,
    longRestDuring: 15,
    workDuring: 10,
    longRestInterval: 4,
    dailyTargetCount: 5,
    isRingHint: true,
    isShakeHint: true,
    isStartSelectTask: true,
    showToDoCount: true,
    notice4MorningEvening: true,
}

export const formalDbData = {
    index: 1,
    shortRestDuring: 5 * 60,
    longRestDuring: 15 * 60,
    workDuring: 25 * 60,
    longRestInterval: 4,
    dailyTargetCount: 8,
    isRingHint: true,
    isShakeHint: true,
    isStartSelectTask: true,
    showToDoCount: true,
    notice4MorningEvening: true,
}


export class TomatoConfigModel {

    constructor(props) {
        this.setupTomatoConfigData();
    }

    static setupTomatoConfigData() {
        let devConfig = devDbData;
        let formalConfig = formalDbData;

        let devConfigs = realm.objects('TomatoConfig').filtered('index = 0');
        if (devConfigs[0] === undefined) {
            realm.write(() => {
                realm.create('TomatoConfig', {...devDbData})
            })
        } else {
            devConfig = {...devConfigs[0]}
        }

        let formalConfigs = realm.objects('TomatoConfig').filtered('index = 1');
        if (formalConfigs[0] === undefined) {
            realm.write(() => {
                realm.create('TomatoConfig', {...formalDbData})
            })
        } else {
            formalConfig = {...formalConfigs[0]}
        }


        return [devConfig, formalConfig] // {...xxx}解构出来 当新的Object使用

        /*
                if (formalConfig.length >= 1) {
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
        */

    }


}