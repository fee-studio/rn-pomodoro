import {Task} from "./RealmDB";
import {TaskState} from "../config/GlobalData";
import RealmDBService from "./RealmDBService";

export default class TaskService extends RealmDBService {

    static create(taskModel) {
        super.create(Task.schema.name, taskModel);
    }

    static update(taskModel) {
        super.update(Task.schema.name, taskModel);
    }

    static read(taskState = TaskState.TaskStateUnknown) {
        let tasks = super.read(Task.schema.name);
        tasks = tasks.filtered(`status = ${taskState} AND deleted = false`);

        // 分开写是为了处理各种情况下不同的逻辑.
        if (taskState === TaskState.TaskStateTodo) {
            tasks = tasks.sorted('actionTime')
        } else if (taskState === TaskState.TaskStatePlan) {
            tasks = tasks.sorted('actionTime')
        } else if (taskState === TaskState.TaskStateComplete) {
            tasks = tasks.sorted('actionTime', true)
        } else if (taskState === TaskState.TaskStateOverdue) {
            tasks = tasks.sorted('actionTime', true)
        }

        return tasks;
    }

    static delete(taskModel) {
        super.delete(Task.schema.name, taskModel);
    }


    // static create(taskModel) {
    //     realm.write(() => {
    //         taskModel.createdAt = new Date();
    //         taskModel.updatedAt = new Date();
    //
    //         realm.create(Task.schema.name, taskModel);
    //     })
    // }
    //
    // static update(task, updateCallback) {
    //     if (!updateCallback) {
    //         return;
    //     }
    //
    //     realm.write(() => {
    //         updateCallback();
    //         task.updatedAt = new Date();
    //     })
    // }
    //
    // static updateWithModel(taskModel) {
    //     realm.write(() => {
    //         taskModel.updatedAt = new Date();
    //         realm.create(Task.schema.name, taskModel, true);
    //     })
    // }
    //
    // static read(taskState = TaskState.TaskStateUnknown) {
    //     let tasks = realm.objects(Task.schema.name);
    //
    //     // 分开写是为了处理各种情况下不同的逻辑.
    //     if (taskState === TaskState.TaskStateTodo) {
    //         tasks = tasks.filtered(`status = ${taskState}`).sorted('actionTime') // todo: filter deleted field
    //     } else if (taskState === TaskState.TaskStatePlan) {
    //         tasks = tasks.filtered(`status = ${taskState}`).sorted('actionTime')
    //     } else if (taskState === TaskState.TaskStateComplete) {
    //         tasks = tasks.filtered(`status = ${taskState}`).sorted('actionTime', true)
    //     } else if (taskState === TaskState.TaskStateOverdue) {
    //         tasks = tasks.filtered(`status = ${taskState}`).sorted('actionTime', true)
    //     }
    //
    //     return tasks;
    // }
    //
    //
    // static delete(taskModel) {
    //     realm.write(() => {
    //         taskModel.updatedAt = new Date();
    //         taskModel.deleted = true;
    //
    //         realm.create(Task.schema.name, taskModel, true);
    //     })
    // }
    //
    //
}