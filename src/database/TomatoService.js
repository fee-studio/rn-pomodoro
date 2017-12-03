import {Tomato} from './RealmDB'
import RealmDBService from "./RealmDBService";

export default class TomatoService extends RealmDBService {
    static create(tomatoModel) {
        super.create(Tomato.schema.name, tomatoModel);
    }

    static update(tomatoModel) {
        super.update(Tomato.schema.name, tomatoModel)
    }

    static read() {
        super.read(Tomato.schema.name)
    }

    static delete(tomatoModel) {
        super.delete(Tomato.schema.name, tomatoModel)
    }



}