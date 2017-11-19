/**
 *  功能：
 */
import {
    NAV_TO_CREATE_TASK, NAV_TO_TASK_SCREEN, NAV_TO_TASK_SCREEN_SELECT_TASK,
    NAV_TO_TOMATO_SCREEN_WITH_TASK
} from "./actionTypes";
import {TaskScreenType} from "../config/GlobalData";


export const toCreateTask = (taskItem) => ({
    type: NAV_TO_CREATE_TASK,
    item: taskItem,
});

export const toTaskScreen = (taskScreenType = TaskScreenType.TaskScreenTypeList) => ({
    type: NAV_TO_TASK_SCREEN,
    taskScreenType: TaskScreenType.TaskScreenTypeList,
});

export const toTaskScreenSelectTask = () => ({
    type: NAV_TO_TASK_SCREEN_SELECT_TASK,
    taskScreenType: TaskScreenType.TaskScreenTypeSelect,
});

export const toTomatoScreenWithTask = (task) => ({
    type: NAV_TO_TOMATO_SCREEN_WITH_TASK,
    task: task
});



