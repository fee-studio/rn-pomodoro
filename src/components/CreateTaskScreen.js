/**
 *  功能：
 */

import React from "react";
import {Text, View, StyleSheet, TextInput, Button, Switch} from "react-native";

export default class CreateTaskScreen extends React.PureComponent {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: "添加任务",
            headerRight: <Button title="完成" onPress={() => params.handleSave()}/>
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({handleSave: this.saveTask});
    }

    constructor(props) {
        super(props);

        this.ddd = "fengyyyyyyyyyy"

        this.state = {
            text: '',
            isRemind: true,
        };
    }

    saveTask = () => {
        console.log('save task')
        console.log('save task' + this.ddd);
        console.log('save task' + this.state.text);
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput style={styles.textInput}
                           autoFocus={true}
                           multiline={true}
                           blurOnSubmit={true}
                           placeholder={'添加任务名称'}
                           onChangeText={(text) => this.setState({text})}
                           value={this.state.text}
                />

                <View style={styles.category}>
                    <Text>任务类别</Text>
                    <View style={styles.categoryButtonView}>
                        <Button title={'今日待办'} onPress={() => {
                        }}/>
                        <Button title={'未来计划'} onPress={() => {
                        }}/>
                    </View>
                </View>

                <View style={styles.remind}>
                    <Text>提醒</Text>
                    <View style={styles.remindRightView}>
                        <Switch value={this.state.isRemind}/>
                    </View>
                </View>

            </View>
        );
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        height: 80,
        fontSize: 20,
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 20,
    },
    category: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    categoryButtonView: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    remind: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    remindRightView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});