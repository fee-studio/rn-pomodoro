/**
 *  功能：
 */

import React from "react";
import {Text, View, StyleSheet, TextInput, Button, Switch, TouchableHighlight} from "react-native";
import realm from '../database/RealmDB'
import {TaskState} from "../config/Gloable";

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
            taskName: '',
            isRemind: true,
            status: TaskState.TaskStatePlan,
        };
    }

    saveTask = () => {
        console.log('save task')
        console.log('save task' + this.ddd);
        console.log('save task' + this.state.text);

        realm.write(() => {
            realm.create('Task', {
                taskName: this.state.taskName,
                isRemind: this.state.isRemind,
                createTime: new Date(),
                updateTime: new Date(),
                actionTime: new Date(),
                remindTime: this.state.isRemind ? new Date() : null,
                status: this.state.status,
                tomatoes: null,
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput style={styles.textInput}
                           autoFocus={true}
                           multiline={true}
                           blurOnSubmit={true}
                           placeholder={'您的任务名称'}
                           onChangeText={(taskName) => this.setState({taskName})}
                           value={this.state.text}
                />

                <View style={styles.category}>
                    <Text>任务类别</Text>
                    <View style={styles.categoryButtonView}>
                        <TouchableHighlight
                            style={this.state.status === TaskState.TaskStateTodo ? [styles.buttonSelected, styles.categoryButtonLeft] : [styles.buttonNormal, styles.categoryButtonLeft]}
                            onPress={() => {
                                this.setState({
                                    status: TaskState.TaskStateTodo
                                })
                                this.forceUpdate()
                            }}>
                            <Text
                                style={this.state.status === TaskState.TaskStateTodo ? styles.textSelected : styles.textNormal}>
                                今日待办
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={this.state.status === TaskState.TaskStatePlan ? [styles.buttonSelected] : [styles.buttonNormal]}
                            onPress={() => {
                                this.setState({
                                    status: TaskState.TaskStatePlan
                                })
                                this.forceUpdate()
                            }}>
                            <Text
                                style={this.state.status === TaskState.TaskStatePlan ? styles.textSelected : styles.textNormal}>
                                未来计划
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={styles.remind}>
                    <Text>提醒</Text>
                    <View style={styles.remindRightView}>
                        <Switch value={this.state.isRemind} onValueChange={(value) => {
                            this.setState({
                                isRemind: value
                            })
                        }}/>
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
    categoryButtonLeft: {
        marginRight: 10,
    },
    buttonNormal: {
        borderWidth: 1,
        borderColor: '#f90',
        borderRadius: 4,
        backgroundColor: '#0000',
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textNormal: {
        color: '#f90',
        fontSize: 12
    },
    buttonSelected: {
        borderWidth: 1,
        borderColor: '#f90',
        borderRadius: 4,
        backgroundColor: '#f90',
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSelected: {
        color: '#fff',
        fontSize: 12
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