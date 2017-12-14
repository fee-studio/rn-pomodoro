import {Tomato} from './RealmDB'
import RealmDBService from "./RealmDBService";
import {TaskState, TomatoState, TomatoType} from "../utils/GlobalData";

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
        let didFinishTomatoes = tomatoes.filtered(`type = ${TomatoType.TomatoTypeWorking} AND state = ${TomatoState.TomatoStateFinished} AND deleted = false`); // todo 和下面的 封装下
        let count = didFinishTomatoes.length;
        return count;
    }

    static didFinishTotalTime() {
        let tomatoes = TomatoService.read();
        let didFinishTomatoes = tomatoes.filtered(`type = ${TomatoType.TomatoTypeWorking} AND state = ${TomatoState.TomatoStateFinished} AND deleted = false`);
        let totalTime = didFinishTomatoes.sum('duration');

        return totalTime;
    }

    static didFinishTodayCount() {
        let date = new Date();
        let nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000); // 后一天

        let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let tomorrow = new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate());

        let tomatoes = TomatoService.read();
        let didFinishTomatoes = tomatoes.filtered(`type = ${TomatoType.TomatoTypeWorking} AND state = ${TomatoState.TomatoStateFinished} AND deleted = false`);
        let todayTomatoes = didFinishTomatoes.filtered('startTime >= $0 AND startTime < $1', today, tomorrow); // VIP realm-js时间对象比较的写法.
        let count = todayTomatoes.length;
        return count;
    }

    static arrInMonthDidFinishCount() {
        let arr = [];
        let date = new Date();
        for (let i = 0; i < 30; i++) {
            let aDate = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
            let aNextDate = new Date(aDate.getTime() + 24 * 60 * 60 * 1000);

            let theDate = new Date(aDate.getFullYear(), aDate.getMonth(), aDate.getDate());
            let theNextDate = new Date(aNextDate.getFullYear(), aNextDate.getMonth(), aNextDate.getDate());

            let tomatoes = TomatoService.read();
            let didFinishTomatoes = tomatoes.filtered(`type = ${TomatoType.TomatoTypeWorking} AND state = ${TomatoState.TomatoStateFinished} AND deleted = false`);
            let theTomatoes = didFinishTomatoes.filtered('startTime >= $0 AND startTime < $1', theDate, theNextDate); // VIP realm-js时间对象比较的写法.

            let count = theTomatoes.length;

            let item = {id: i, title: `${theDate.getMonth()+1}-${theDate.getDate()}`, tomatoCount: count};
            arr.unshift(item);
        }
        return arr;
    }


}