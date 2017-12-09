import {TaskState, TomatoState, TomatoType} from "../utils/GlobalData";
import uuid from "uuid";

export default class TaskModel {

    constructor() {
        this.id = uuid();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deleted = false;

        this.taskName = "";
        this.isRemind = false;
        this.actionTime = new Date();
        this.remindTime = new Date();
        this.status = TaskState.TaskStateUnknown;
        this.tomatoes = [];
    }
}