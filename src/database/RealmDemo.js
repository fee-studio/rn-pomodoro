/**
 *  功能：
 */

import React, {Component} from 'react';
import {
    SectionList,
    Text,
    View
} from 'react-native';

const Realm = require('realm');

export class RealmDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {realm: null};
    }

    componentWillMount() {
        Realm.open({
            schema: [{name: 'Dog', properties: {name: 'string'}}]
        }).then(realm => {
            realm.write(() => {
                realm.create('Dog', {name: 'Rex'});
            });
            this.setState({realm});
        });
    }

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

                <SectionList renderItem={({item}) => <Text>{item.name}</Text>}
                             sections={this.items}
                />

            </View>
        );
    }
}

