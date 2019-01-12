import {AT_REFRESH_DATA} from "./actionTypes";

/**
 * VIP  以下3中写法都可以,
 *      注意哪个是方法，哪个不是方法，在dispatch的时候要注意方法名后的括号。
 */

// VIP 无参数时可以这么简写，注意dispatch时写法：dispatch(actionRefreshData)
// actionRefreshData后没有括号
export const actionRefreshData = {type: AT_REFRESH_DATA};

// VIP 有参数写法1，注意dispatch时写法：dispatch(actionRefreshData2())
// actionRefreshData2后有括号
export const actionRefreshData2 = () => ({
    type: AT_REFRESH_DATA
});

// VIP 有参数写法2，注意dispatch时写法：dispatch(actionRefreshData3())
// actionRefreshData3后有括号
export function actionRefreshData3(text) {
    return {type: AT_REFRESH_DATA, text}
}