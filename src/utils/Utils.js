import {TaskState} from "./GlobalData"
import GlobalData from "./GlobalData"
import TaskService from "../database/TaskService"
import PushNotification from "react-native-push-notification"

export default class Utils {

    constructor() {

    }

    formatDate4TaskList(date: Date) {
        let aDate = date.getFullYear() + "-"
            + date.getMonth() + "-"
            + date.getDate() + " "
            + date.getDay()
    }


    static setupApplicationIconBadgeNumber() {
        let count = 0
        if (GlobalData.tomatoConfig.showTodoCount) {
            count = TaskService.read(TaskState.TaskStateTodo).length;
        }
        PushNotification.setApplicationIconBadgeNumber(count);
    }

}