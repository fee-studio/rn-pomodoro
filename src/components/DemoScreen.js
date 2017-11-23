/**
 *  功能：
 */

import React from "react";
import {Text, View, StyleSheet, TextInput, Button, Switch, TouchableHighlight} from "react-native";
import realm from '../database/RealmDB'
import {TaskState} from "../config/GlobalData";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {connect} from "react-redux";
import {COLOR} from "../config/Config";
import {DocumentPicker, DocumentPickerUtil} from '../libs/DocumentPicker';

class DemoScreen extends React.PureComponent {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: "demo",
        };
    };


    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    onButtonPress = () => {
        // iPhone/Android
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.images()],
        }, (error, res) => {
            alert(JSON.stringify(error))
            alert(JSON.stringify(res))

            // Android
            console.log(
                res.uri,
                res.type, // mime type
                res.fileName,
                res.fileSize
            );
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.onButtonPress}
                    title="document picker"
                    color="#841584"
                    accessibilityLabel="Learn more about purple"
                />
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(DemoScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});