import {NavigationActions} from 'react-navigation';

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

const screenTracking = ({getState}) => next => (action) => {
    if (action.type !== NavigationActions.NAVIGATE && action.type !== NavigationActions.BACK) {
        return next(action);
    }

    const currentScreen = getCurrentRouteName(getState().reducerNavigator);
    const result = next(action);
    const nextScreen = getCurrentRouteName(getState().reducerNavigator);
    if (nextScreen !== currentScreen) {
        // the line below uses the Google Analytics tracker
        // change the tracker here to use other Mobile analytics SDK.

    }
    return result;
};

export default screenTracking;
