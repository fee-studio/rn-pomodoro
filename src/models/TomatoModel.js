/**
 *  功能：
 */


/**
 *  功能：
 */

'use strict';

import {TomatoState, TomatoType} from '../config/GlobalData'
import GlobalData from "../config/GlobalData";

export class TomatoModel {
    // 数据库使用
    tomatoId = ""
    startTime = new Date()
    endTime = new Date()
    isInterrupt = false
    state = TomatoState.TomatoStateUnknown
    workDuring = 3
    curTask = {}

    // 本地使用
    tomatoType = TomatoType.TomatoTypeInit


    constructor(props) {

    }

    start(tomatoType = TomatoType.TomatoTypeWorking, curTask = {}) {
        if (this === undefined) {
            return;
        }

        this.tomatoType = tomatoType;
        this.startTime = new Date();
        this.workDuring = GlobalData.defaultTomatoConfig.workDuring;
        this.curTask = curTask;
        this.isInterrupt = false;
        this.state = TomatoState.TomatoStateStart;

        return this;
    }

    stop() {
        if (this === undefined) {
            return;
        }

        this.state = TomatoState.TomatoStateCancel;
        return this;
    }


}

/*
export class TaskModel {
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


export class TomatoConfigModel {

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

*/