/**
 *  功能：
 */
import realm, {TomatoConfig} from '../database/RealmDB'


export const devDbData = {
    id: '0',
    createdAt: new Date(),
    updatedAt: new Date(),
    shortRestDuration: 5,
    longRestDuration: 15,
    duration: 10,
    longRestInterval: 4,
    dailyTargetCount: 5,
    isRingHint: true,
    isShakeHint: true,
    isStartSelectTask: true,
    showTodoCount: true,
    notice4MorningEvening: true,
}

export const formalDbData = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    shortRestDuration: 5 * 60,
    longRestDuration: 15 * 60,
    duration: 25 * 60,
    longRestInterval: 4,
    dailyTargetCount: 8,
    isRingHint: true,
    isShakeHint: true,
    isStartSelectTask: true,
    showTodoCount: true,
    notice4MorningEvening: true,
}


export class TomatoConfigModel {

    constructor(props) {
        this.setupTomatoConfigData();
    }

    static setupTomatoConfigData() {
        let devConfig = devDbData;
        let formalConfig = formalDbData;

        let devConfigs = realm.objects('TomatoConfig').filtered("id = '0'");
        if (devConfigs[0] === undefined) {
            realm.write(() => {
                realm.create('TomatoConfig', {...devDbData})
            })
        } else {
            devConfig = {...devConfigs[0]}
        }

        let formalConfigs = realm.objects('TomatoConfig').filtered("id = '1'");
        if (formalConfigs[0] === undefined) {
            realm.write(() => {
                realm.create('TomatoConfig', {...formalDbData})
            })
        } else {
            formalConfig = {...formalConfigs[0]}
        }


        return [devConfig, formalConfig] // {...xxx}解构出来 当新的Object使用

    }


}