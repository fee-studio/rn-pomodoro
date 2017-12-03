/**
 *  功能：
 */

'use strict';

import {TomatoState, TomatoType} from '../config/GlobalData'
import GlobalData from "../config/GlobalData";
import uuid from "uuid";

export default class TomatoModel {

    constructor() {
        this.id = uuid();
        this.createdAt = new Date();
        this.updatedAt = new Date();

        this.startTime = new Date();
        this.endTime = new Date();
        this.isInterrupt = false;
        this.state = TomatoState.TomatoStateInit;
        this.type = TomatoType.TomatoTypeInit;
        this.duration = 0;
        this.curTask = {}
    }

    // start() {
    //     if (this === undefined) {
    //         return;
    //     }
    //
    //     this.state = TomatoState.TomatoStateStart;
    //     return this;
    // }
    //
    // stop() {
    //     if (this === undefined) {
    //         return;
    //     }
    //
    //     this.state = TomatoState.TomatoStateCancel;
    //     return this;
    // }
    //
    // finish() {
    //     if (this === undefined) {
    //         return;
    //     }
    //
    //     this.state = TomatoState.TomatoStateFinished;
    //     return this;
    // }

}

/*
export class TaskModel {
}

Task.schema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
        id: {type: 'string'},
        taskName: {type: 'string'},
        isRemind: {type: 'bool'},
        createdAt: {type: 'date'},
        updatedAt: {type: 'date'},
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
        shortRestDuration: {type: 'int'},    // 短休息时长
        longRestDuration: {type: 'int'},     // 长休息时长
        duration: {type: 'int'},         // 专注工作时长
        longRestInterval: {type: 'int'},   // 长休息间隔
        dailyTargetCount: {type: 'int'},   // 每日番茄钟目标数
        isRingHint: {type: 'bool'},             // 铃声提示
        isShakeHint: {type: 'bool'},            // 震动提示
        isStartSelectTask: {type: 'bool'},      // 开始时选择任务
        showTodoCount: {type: 'bool'},          // 应用图标数字标记今日待办数
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