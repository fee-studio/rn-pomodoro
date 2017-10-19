/**
 *  作者：冯夷夷
 *  功能：
 */


import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {StacksOverTabs, TabNav} from './components/MainScreen';



class PomodoroApp extends React.Component {

    constructor(props) {
        super(props);

        console.log("feng");
        // myDataTest();
        // this.realmTest()
        console.log("yiyi");
        console.log("yiyi");
    }

    // realmTest() {
    //     // Create Realm objects and write to local storage
    //     realm.write(() => {
    //         const myCar = realm.create('Car', {
    //             make: 'Honda',
    //             model: 'Civic',
    //             miles: 1000,
    //         });
    //         myCar.miles += 20; // Update a property value
    //     });
    //
    //     // Query Realm for all cars with a high mileage
    //     const cars = realm.objects('Car').filtered('miles > 1000');
    //
    //     // Will return a Results object with our 1 car
    //     console("cars.count = " + cars.length);// => 1
    //
    //     // Add another car
    //     realm.write(() => {
    //         const myCar = realm.create('Car', {
    //             make: 'Ford',
    //             model: 'Focus',
    //             miles: 2000,
    //         });
    //     });
    //
    //     // Query results are updated in realtime
    //     console("cars.length = " + cars.length); // => 2
    // }

    render() {
        return (
            <StacksOverTabs/>
        )
    }
}

AppRegistry.registerComponent('PomodoroApp', () => PomodoroApp);
