import {AT_REFRESH_DATA} from "./actionTypes";

/**
 * VIP  这里需要注意的是：state需要有变化，这个action才能触发。
 *      如果直接return原state是不会触发mapStateToProps的。
 *      所以，即使实际的业务中不需要state改变，也要简单改变一下。
 *      如下面的count值。
 */
const reducerStatistics = (state = {count: 0}, action) => {
    const count = state.count
    let nextState;
    switch (action.type) {
        case AT_REFRESH_DATA:
            // 什么也不需要做
            nextState = {count: count + 1};
            break;
        default:
            break;
    }
    return nextState || state;
};

export default reducerStatistics;