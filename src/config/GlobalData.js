/**
 *  功能：
 */

// import Initialization from "./Initialization";
import {devDbData, formalDbData, TomatoConfigModel} from "../models/TomatoConfigModel";
import realm, {TomatoConfig} from '../database/RealmDB'
import {DEBUG} from "./Config";

export const TaskState = {
    TaskStateUnknown: 0,       // 未知的
    TaskStateTodo: 1,          // 今日待办
    TaskStatePlan: 2,          // 任务计划
    TaskStateComplete: 3,      // 完成的
    TaskStateOverdue: 4        // 过期的
}

export const TaskStateTitle = {
    TaskStateTitleUnknown: '未知的',       // 未知的
    TaskStateTitleTodo: '今日待办',          // 今日待办
    TaskStateTitlePlan: '任务计划',          // 任务计划
    TaskStateTitleComplete: '完成的',      // 完成的
    TaskStateTitleOverdue: '过期的'        // 过期的
}

export const TomatoState = {
    TomatoStateUnknown: 0,
    TomatoStateStart: 1,
    TomatoStatePause: 2,
    TomatoStateCancel: 3,
    TomatoStateFinished: 4,
}

export const TomatoType = {
    TomatoTypeInit: 0,
    TomatoTypeWorking: 1,
    TomatoTypeResting: 2,
};

export const TaskScreenType = {
    TaskScreenTypeList: 0,
    TaskScreenTypeSelect: 1,
};


// export

export default class GlobalData {

    // static defaultTomatoConfig = null;
    // static defaultTomatoConfig = Initialization.initTomatoConfig();
    static defaultTomatoConfig = GlobalData.getTomatoConfig();

    constructor() {

    }

    static getTomatoConfig() {
        let [devConfig, formalConfig] = TomatoConfigModel.setupTomatoConfigData()
        let config = DEBUG ? devConfig : formalConfig;
        return config;
    }
}