/**
 *  功能：
 */

const Realm = require('realm');
// import Realm from 'realm'

class Task {

}

Task.schema = {
    name: 'Task',
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


class Tomato {

}

Tomato.schema = {
    name: "Tomato",
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


class TomatoConfig {

}

TomatoConfig.schema = {
    name: "Tomato",
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


class Car {
}

Car.schema = {
    name: 'Car',
    properties: {
        make: 'string',
        model: 'string',
        miles: 'int',
    }
};


export function myDataTest() {
    Realm.open({schema: [Car, Task, Tomato, TomatoConfig]})
        .then(realm => {
            // Create Realm objects and write to local storage
            realm.write(() => {
                const myCar = realm.create('Car', {
                    make: 'Honda',
                    model: 'Civic',
                    miles: 1000,
                });
                myCar.miles += 20; // Update a property value
            });

            // Query Realm for all cars with a high mileage
            const cars = realm.objects('Car').filtered('miles > 1000');

            // Will return a Results object with our 1 car
            console("cars.count = " + cars.length);// => 1

            // Add another car
            realm.write(() => {
                const myCar = realm.create('Car', {
                    make: 'Ford',
                    model: 'Focus',
                    miles: 2000,
                });
            });

            // Query results are updated in realtime
            console("cars.length = " + cars.length); // => 2
        });
}

