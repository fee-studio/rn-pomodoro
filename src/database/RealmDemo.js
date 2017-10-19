/**
 *  功能：
 */
'use strict';

import React, {Component} from 'react';
import {
    Button,
    SectionList,
    Text,
    View
} from 'react-native';

// import Realm from 'realm'
// import * as RealmDB from '../database/RealmDB';
// import RealmDB from '../database/RealmDB';
import realm from './RealmDB'

export class RealmDemo extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({
        title: "My Profile!",
        headerRight: <Button title="Menu" onPress={() => navigation.navigate('SettingScreen')}/>,
    });

    constructor(props) {
        super(props);
        this.state = {realm: null};
    }

    // componentWillMount() {
    //     Realm.open({
    //         schema: [{name: 'Dog', properties: {name: 'string'}}]
    //     }).then(realm => {
    //         realm.write(() => {
    //             realm.create('Dog', {name: 'Rex'});
    //         });
    //         this.setState({realm});
    //     });
    // }

    render() {
        // const info = this.state.realm
        //     ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').length
        //     : 'Loading...';


        let list = this.state.realm
            ? this.state.realm.objects('Dog')
            : 'no dog';

        this.items = [
            {
                data: list,
                sectionTitle: "section-title-11111",
            },
        ];

        return (
            <View style={{flex: 1}}>
                {/*<SectionList renderItem={({item}) => <Text>{item.name}</Text>}*/}
                {/*sections={this.items}*/}
                {/*/>*/}
            </View>
        );
    }
}

