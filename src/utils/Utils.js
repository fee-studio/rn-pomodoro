
export default class Utils {

    constructor() {

    }

    formatDate4TaskList(date: Date) {
        let aDate = date.getFullYear() + "-"
            + date.getMonth() + "-"
            + date.getDate() + " "
            + date.getDay()
    }


}