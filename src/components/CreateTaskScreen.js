/**
 *  功能：
 */

import React from "react";
import {Text, View, StyleSheet, TextInput, Button, Switch, TouchableHighlight} from "react-native";
import realm from '../database/RealmDB'
import {TaskState} from "../config/GlobalData";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {connect} from "react-redux";

class CreateTaskScreen extends React.PureComponent {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: "添加任务",
            headerRight: <Button title="完成" onPress={() => params.handleSave()}/>
        };
    };

    _confirmDatePicker = (date) => {
        console.log('A date has been picked: ', date);

        this.setState({
            remindTime: date,
            isDateTimePickerVisible: false,
        });
    };

    _cancelDatePicker = (date) => {
        this.setState({
            isDateTimePickerVisible: false,
            isRemind: false,
        });
    };

    constructor(props) {
        super(props);

        // this.isCreateTask = this.props.navigation.state.params === undefined
        //     || this.props.navigation.state.params.task === undefined;

        this.isCreateTask = this.props.item === undefined;

        console.log('isCreateTask = ' + this.isCreateTask);

        if (this.isCreateTask) {
            this.state = {
                taskId: '' + (realm.objects('Task').length + 1),
                taskName: '',
                isRemind: false,
                status: TaskState.TaskStatePlan,
                createTime: new Date(),
                updateTime: new Date(),
                actionTime: new Date(),
                remindTime: new Date(),
                tomatoes: [],

                isDateTimePickerVisible: false,
            };
        } else {
            this.task = this.props.item;
            this.state = {
                taskId: this.task.taskId,
                taskName: this.task.taskName,
                isRemind: this.task.isRemind,
                status: this.task.status,
                createTime: this.task.createTime,
                updateTime: this.task.updateTime,
                actionTime: this.task.actionTime,
                remindTime: this.task.remindTime,
                tomatoes: [],

                isDateTimePickerVisible: false,
            }
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({handleSave: this.saveTask});
    }

    saveTask = () => {
        realm.write(() => {
            realm.create('Task', {
                taskId: this.state.taskId,
                taskName: this.state.taskName,
                isRemind: this.state.isRemind,
                createTime: this.state.createTime,
                updateTime: this.state.updateTime,
                actionTime: this.state.actionTime,
                remindTime: this.state.remindTime,
                status: this.state.status,
                tomatoes: this.state.tomatoes,
            }, !this.isCreateTask);
        });

        this.props.navigation.goBack();

    };

    render() {
        return (
            <View style={styles.container}>

                <TextInput style={styles.textInput}
                           autoFocus={true}
                           multiline={true}
                           blurOnSubmit={true}
                           placeholder={'您的任务名称'}
                           onChangeText={(taskName) => this.setState({taskName})}
                           value={this.state.taskName}
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
                                // this.forceUpdate()
                            }}>
                            <Text
                                style={this.state.status === TaskState.TaskStateTodo ? styles.textSelected : styles.textNormal}>
                                今日待办
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={this.state.status === TaskState.TaskStatePlan ? [styles.buttonSelected, styles.categoryButtonLeft] : [styles.buttonNormal, styles.categoryButtonLeft]}
                            onPress={() => {
                                this.setState({
                                    status: TaskState.TaskStatePlan
                                })
                                // this.forceUpdate()
                            }}>
                            <Text
                                style={this.state.status === TaskState.TaskStatePlan ? styles.textSelected : styles.textNormal}>
                                未来计划
                            </Text>
                        </TouchableHighlight>
                        {/*VIP 又一种写法*/}
                        {!this.isCreateTask &&
                        <TouchableHighlight
                            style={this.state.status === TaskState.TaskStateComplete ? [styles.buttonSelected] : [styles.buttonNormal]}
                            onPress={() => {
                                this.setState({
                                    status: TaskState.TaskStateComplete
                                })
                                // this.forceUpdate()
                            }}>
                            <Text
                                style={this.state.status === TaskState.TaskStateComplete ? styles.textSelected : styles.textNormal}>
                                已完成
                            </Text>
                        </TouchableHighlight>
                        }
                    </View>
                </View>

                <View style={styles.remind}>
                    <Text>提醒</Text>
                    <View style={styles.remindRightView}>

                        <Switch value={this.state.isRemind} onValueChange={(value) => {
                            this.setState({
                                isRemind: value,
                                isDateTimePickerVisible: value,
                            })
                        }}/>
                    </View>
                </View>

                {this.c_remindTime()}

                <DateTimePicker
                    mode={'datetime'}
                    titleIOS={'选择您的提醒时间'}
                    cancelTextIOS={'取消'}
                    confirmTextIOS={'确定'}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._confirmDatePicker}
                    onCancel={this._cancelDatePicker}
                />

                {this.c_deleteButton()}

            </View>
        );
    }

    c_remindTime() {
        if (this.state.isRemind) {
            return (
                <TouchableHighlight onPress={() => {
                    this.setState(s => ({
                            isDateTimePickerVisible: !s.isDateTimePickerVisible,
                        })
                    )
                }}>
                    <View style={styles.remindTimeView}>
                        <Text>提醒时间</Text>
                        <View style={styles.remindRightView}>
                            <Text>{this.state.remindTime.toLocaleString()}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }
    }

    c_deleteButton() {
        if (this.isCreateTask) {
            return null
        } else {
            return (
                <TouchableHighlight style={styles.deleteButton}
                                    onPress={() => {
                                        alert('will delete')
                                    }}
                >
                    <Text style={styles.deleteButtonText}>删除任务</Text>
                </TouchableHighlight>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.nav.item
    };
};

export default connect(mapStateToProps)(CreateTaskScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        height: 80,
        fontSize: 20,
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 10,
    },
    category: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        height: 44,
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
        marginTop: 10,
        alignItems: 'center',
        height: 44,
    },
    remindTimeView: {
        borderColor: '#ddd',
        borderWidth: 0.5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        height: 44,
    },
    remindRightView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#a00',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        height: 44,
    },
    deleteButtonText: {
        color: '#fff',
    },
});