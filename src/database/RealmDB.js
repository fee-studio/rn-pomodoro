/**
 *  功能：
 */

'use strict';

import Realm from 'realm'
import {TomatoState} from '../config/GlobalData'

export class Tomato extends Realm.Object {
    constructor(props) {
        super(props)

        let tomatoId = "";
        let startTime = new Date();
        let endTime = new Date();
        let isInterrupt = false;
        let state = TomatoState.unknown;
        let workDuring = 3;
        let curTask = {};
    }
}

Tomato.schema = {
    name: "Tomato",
    primaryKey: 'tomatoId',
    properties: {
        tomatoId: {type: 'string'},
        startTime: {type: 'date'},
        endTime: {type: 'date'},
        isInterrupt: {type: 'bool'},
        state: {type: 'int'},
        workDuring: {type: 'int'},
        curTask: {type: 'Task'},
    }
};


export class Task extends Realm.Object {
}

Task.schema = {
    name: 'Task',
    primaryKey: 'taskId',
    properties: {
        taskId: {type: 'string'},
        taskName: {type: 'string'},
        isRemind: {type: 'bool'},
        createTime: {type: 'date'},
        updateTime: {type: 'date'},
        actionTime: {type: 'date'},
        remindTime: {type: 'date'},
        status: {type: 'int'},
        tomatoes: {type: 'list', objectType: 'Tomato'},
    }
};


export class TomatoConfig extends Realm.Object {

    static getInstance() {
        if (!TomatoConfig.instance) {
            TomatoConfig.instance = new TomatoConfig();
        }
        return TomatoConfig.instance;
    }

    constructor() {
        super()


    }


}

TomatoConfig.schema = {
    name: "TomatoConfig",
    properties: {
        index: {type: 'int'},              // id code
        shortRestDuring: {type: 'int'},    // 短休息时长
        longRestDuring: {type: 'int'},     // 长休息时长
        workDuring: {type: 'int'},         // 专注工作时长
        longRestInterval: {type: 'int'},   // 长休息间隔
        dailyTargetCount: {type: 'int'},   // 每日番茄钟目标数
        isRingHint: {type: 'bool'},             // 铃声提示
        isShakeHint: {type: 'bool'},            // 震动提示
        isStartSelectTask: {type: 'bool'},      // 开始时选择任务
        showToDoCount: {type: 'bool'},          // 应用图标数字标记今日待办数
        notice4MorningEvening: {type: 'bool'},  // 早9晚9通知
    }
};


class Car extends Realm.Object {
}

Car.schema = {
    name: 'Car',
    properties: {
        make: 'string',
        model: 'string',
        miles: 'int',
    }
};

// const realm = new Realm();
const realm = new Realm({schema: [Car, Task, Tomato, TomatoConfig]});

export default realm;