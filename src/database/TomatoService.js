import {Tomato} from './RealmDB'
import RealmDBService from "./RealmDBService";
import {TaskState, TomatoState} from "../utils/GlobalData";

export default class TomatoService extends RealmDBService {
    static create(tomatoModel) {
        super.create(Tomato.schema.name, tomatoModel);
    }

    static update(tomatoModel) {
        super.update(Tomato.schema.name, tomatoModel)
    }

    static read() {
        let tomatoes = super.read(Tomato.schema.name);
        return tomatoes;
    }

    static delete(tomatoModel) {
        super.delete(Tomato.schema.name, tomatoModel)
    }


    static didFinishTotalCount() {
        let tomatoes = TomatoService.read();
        let didFinishTomatoes = tomatoes.filtered(`state = ${TomatoState.TomatoStateFinished} AND deleted = false`);
        let count = didFinishTomatoes.length;
        return count;
    }

    static didFinishTotalTime() {
        let tomatoes = TomatoService.read();
        let didFinishTomatoes = tomatoes.filtered(`state = ${TomatoState.TomatoStateFinished} AND deleted = false`);
        let totalTime = didFinishTomatoes.sum('duration');

        // let totalTime = 0;
        // for (let tomato in didFinishTomatoes) {
        //     totalTime += tomato.duration;
        // }

        return totalTime;
    }

    static didFinishTodayCount() {
        let date = new Date();
        let nextDate = new Date(date.getTime() + 24*60*60*1000); //后一天

        let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let tomorrow = new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate());

        let tomatoes = TomatoService.read();
        let didFinishTomatoes = tomatoes.filtered(`state = ${TomatoState.TomatoStateFinished} AND deleted = false`);
        let todayTomatoes = didFinishTomatoes.filtered('startTime >= $0 AND startTime < $1', today, tomorrow); // VIP realm-js时间对象比较的写法.
        let count = todayTomatoes.length;
        return count;
    }

}