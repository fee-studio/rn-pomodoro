import realm from 'RealmDB'

export default class TomatoService {
    create(tomatoModel) {
        realm.write(() => {
            tomatoModel.createdAt = new Date()
            tomatoModel.updatedAt = new Date()

            realm.create(Tomato.schema.name, tomatoModel)
        })
    }

    update() {

    }

    read() {

    }

    delete() {

    }

}