/**
 *  功能：
 */
import {NAV_TO_CREATE_TASK} from "./actionTypes";


export const toCreateTask = (taskItem) => ({
    type: NAV_TO_CREATE_TASK,
    item: taskItem,
});


