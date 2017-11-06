/**
 *  功能：
 */
import {NAV_TO_CREATE_TASK, NAV_TO_TASK_SCREEN} from "./actionTypes";
import {TaskScreenType} from "../config/GlobalData";


export const toCreateTask = (taskItem) => ({
    type: NAV_TO_CREATE_TASK,
    item: taskItem,
});

export const toTaskScreen = (taskScreenType = TaskScreenType.TaskScreenTypeList) => ({
    type: NAV_TO_TASK_SCREEN,
    taskScreenType: taskScreenType,
});


