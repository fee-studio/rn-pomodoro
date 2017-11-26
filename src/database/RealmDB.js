/**
 *  功能：
 */


'use strict';

import Realm from 'realm'

export class Tomato extends Realm.Object {
    static schema = {
        name: 'Tomato',
        primaryKey: 'tomatoId',
        properties: {
            tomatoId: {type: 'string'},
            startTime: {type: 'date'},
            endTime: {type: 'date'},
            isInterrupt: {type: 'bool'},
            state: {type: 'int'},
            workDuring: {type: 'int'},
            curTask: {type: 'Task'},
        }
    };


}


export class Task extends Realm.Object {
    static schema = {
        name: 'Task',
        primaryKey: 'taskId',
        properties: {
            taskId: {type: 'string'},
            taskName: {type: 'string'},
            isRemind: {type: 'bool'},
            createTime: {type: 'date'},
            updateTime: {type: 'date'},
            actionTime: {type: 'date'},
            remindTime: {type: 'date'},
            status: {type: 'int'},
            tomatoes: {type: 'list', objectType: 'Tomato'},
        }
    };
}


export class TomatoConfig extends Realm.Object {
    static schema = {
        name: 'TomatoConfig',
        primaryKey: 'index',
        properties: {
            index: {type: 'int'},              // id code
            shortRestDuring: {type: 'int'},    // 短休息时长
            longRestDuring: {type: 'int'},     // 长休息时长
            workDuring: {type: 'int'},         // 专注工作时长
            longRestInterval: {type: 'int'},   // 长休息间隔
            dailyTargetCount: {type: 'int'},   // 每日番茄钟目标数
            isRingHint: {type: 'bool'},             // 铃声提示
            isShakeHint: {type: 'bool'},            // 震动提示
            isStartSelectTask: {type: 'bool'},      // 开始时选择任务
            showToDoCount: {type: 'bool'},          // 应用图标数字标记今日待办数
            notice4MorningEvening: {type: 'bool'},  // 早9晚9通知
        }
    };

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


// VIP https://github.com/realm/realm-js/issues/141#ref-issue-231063626
// TODO realm and redux 的结合，有时间研究
export class Car extends Realm.Object {
    static schema = {
        name: 'Car',
        primaryKey: 'id',
        properties: {
            id: 'int',
            model: 'string',
            name: 'string'
        }
    };

    // static methods
    static getCar(id) {
        // see definition below
        return Car.getFromId(id);
    }

    // a method
    changeName(name) {
        realm.write(() => {
            this.name = name;
        });
    }

    // here is where we call the mapping of "pure" properties for redux
    props() {
        return Car.mapProps(this);
    }
}

const schemas = [Car, Task, Tomato, TomatoConfig];

const realm = new Realm({schema: schemas});

/*
// this is kinda hacky
// this will basically inject static methods for common realm methods
schemas.forEach((ObjectType) => {
    alert(ObjectType)
    const schemaName = ObjectType.schema.name;

    ObjectType.get = function () {
        return realm.objects(schemaName);
    }

    ObjectType.getFromId = function (id) {
        return realm.objectForPrimaryKey(schemaName, id);
    }

    // the static method that can be used for every realm objects
    ObjectType.mapProps = function (object, exclude = []) {
        let props = {};
        const propNames = Object.keys(ObjectType.schema.properties).filter(p => exclude.indexOf(p) < 0);

        propNames.forEach((p) => {
            if (typeof object[p] !== 'function') {
                const propSchema = ObjectType.schema.properties[p];
                let type = null;
                if (typeof propSchema === 'string') {
                    type = propSchema;
                } else {
                    type = propSchema.type;
                }

                switch (type) {
                    case 'date':
                        props[p] = object[p] && object[p].getTime();
                        break;
                    default:
                        props[p] = object[p];
                        break;
                }
            }
        });

        return props;
    }

    // your common realm methods here like inserts, updates, etc.
    // ...
});

*/

export default realm;