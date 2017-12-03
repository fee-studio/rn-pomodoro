import realm from "./RealmDB";

export default class RealmDBService {

    static create(schemaName, model) {
        realm.write(() => {
            model.createdAt = new Date();
            model.updatedAt = new Date();

            realm.create(schemaName, model);
        })
    }

    static update(schemaName, mdoel) {
        realm.write(() => {
            mdoel.updatedAt = new Date();
            realm.create(schemaName, mdoel, true);
        })
    }

    static update2(dbObject, updateCallback) {
        if (!updateCallback) {
            return;
        }

        realm.write(() => {
            updateCallback();
            dbObject.updatedAt = new Date();
        })
    }

    static read(schemaName) {
        let data = realm.objects(schemaName);
        return data;
    }

    // Delete with the update!!!
    static delete(schemaName, model) {
        realm.write(() => {
            model.updatedAt = new Date();
            model.deleted = true;
            realm.create(schemaName, model, true);
        })
    }

}