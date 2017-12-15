/**
 *  功能：
 */

import React from "react";
import {Text, View, StyleSheet, TextInput, Button, Switch, TouchableHighlight, ART} from "react-native";
import realm from '../database/RealmDB'
import {TaskState} from "../utils/GlobalData";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {connect} from "react-redux";
import {COLOR} from "../utils/Config";
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
        let width = 100;
        let side = 60;
        let radius = 10;

        const path = ART.Path()
            .moveTo((width - side * Math.sin(Math.PI / 3)) / 2, width / 2)
            .lineTo((width - side * Math.sin(Math.PI / 3)) / 2, (width - side) / 2 + radius / Math.tan(Math.PI / 6))
            .arc(radius + radius * Math.sin(Math.PI / 6), -(radius * Math.cos(Math.PI / 6)), radius)
            .lineTo(width - (width - side * Math.sin(Math.PI / 3)) / 2 - (radius * Math.sin(Math.PI / 3) / Math.tan(Math.PI / 6)),
                width / 2 - (radius * Math.sin(Math.PI / 3)))
            .arc(0, 2 * (radius * Math.sin(Math.PI / 3)), radius)
            .lineTo((width - side * Math.sin(Math.PI / 3)) / 2 + (radius / Math.tan(Math.PI / 6) * Math.sin(Math.PI / 3)),
                width - (width - side) / 2 - (radius / Math.tan(Math.PI / 6) * Math.cos(Math.PI / 3)))
            .arc(-(radius + radius * Math.cos(Math.PI / 3)), -(radius * Math.sin(Math.PI / 3)), radius)
            .close();

        return (
            <View style={styles.container}>
                <Button
                    onPress={this.onButtonPress}
                    title="document picker"
                    color="#841584"
                    accessibilityLabel="Learn more about purple"
                />

                <ART.Surface width={width} height={width} >
                    <ART.Shape d={path} stroke="#f00" fill="#f00" strokeWidth={1}/>
                </ART.Surface>

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