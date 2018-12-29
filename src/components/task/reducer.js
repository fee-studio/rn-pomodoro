import {combineReducers} from 'redux';
import {
    ITEM_SCROLLING,
} from "./actionTypes";



const taskReducer = (state = [], action) => {
    let nextState;
    switch (action.type) {
        case ITEM_SCROLLING:
            nextState = {scrolling: action.scrolling};
            break;
        default:
            break;
    }
    return nextState || state;
};

export default taskReducer;