/**
 *  功能：
 */


import Initialization from "./Initialization";

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

// export  //

export default class GlobalData {

    static DefaultTomatoConfig = null;

    constructor() {
        // let DefaultTomatoConfig = Initialization.initTomatoConfig()
    }

    static defaultTomatoConfig() {
        if (GlobalData.DefaultTomatoConfig === null) {
            console.warn("init tomato config data");
            GlobalData.DefaultTomatoConfig = Initialization.initTomatoConfig();
            return GlobalData.DefaultTomatoConfig;
        } else {
            console.warn("get tomato config data from static pool");
            return GlobalData.DefaultTomatoConfig;
        }

        // if (this.DefaultTomatoConfig === null) {
        //     this.DefaultTomatoConfig = Initialization.initTomatoConfig();
        //     return this.DefaultTomatoConfig;
        // } else {
        //     return this.DefaultTomatoConfig;
        // }

        // return Initialization.initTomatoConfig()
    }


    // const DefaultTomatoConfig = Initialization.initTomatoConfig();


}