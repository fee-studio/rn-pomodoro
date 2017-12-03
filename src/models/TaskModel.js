import {TaskState, TomatoState, TomatoType} from "../config/GlobalData";
import uuid from "uuid";

export default class TaskModel {

    constructor() {
        this.id = uuid();
        this.createdAt = new Date();
        this.updatedAt = new Date();

        this.taskName = "";
        this.isRemind = false;
        this.deleted = false;
        this.actionTime = new Date();
        this.remindTime = new Date();
        this.status = TaskState.TaskStateUnknown;
        this.tomatoes = [];
    }


}