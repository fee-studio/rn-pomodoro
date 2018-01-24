/**
 *  功能：
 */

import React from "react"
import {
    Text, View, StyleSheet, TextInput, Button, Switch, TouchableHighlight,
    TouchableWithoutFeedback, Keyboard
} from "react-native"
import realm from '../../database/RealmDB'
import {TaskState} from "../../utils/GlobalData"
import DateTimePicker from 'react-native-modal-datetime-picker'
import {connect} from "react-redux"
import {COLOR} from "../../utils/Config"
import TaskService from "../../database/TaskService"
import TaskModel from "../../models/TaskModel"
import {toCreateTask} from "../../navigators/actions"
import Toast from "react-native-easy-toast"

class CreateTaskScreen extends React.PureComponent {

    static navigationOptions = ({navigation}) => {
        const {params = {name: ""}} = navigation.state
        return {
            title: params.name,
            headerRight: <TouchableWithoutFeedback style={styles.headerRightBtn}
                                                   onPress={() => {
                                                       params.handleSave && params.handleSave()
                                                   }}>
                <View>
                    <Text style={{color: COLOR.blue, fontSize: 18, width: 50,}}>完成</Text>
                </View>
            </TouchableWithoutFeedback>
            // headerRight: <Button title="完成" onPress={() => params.handleSave()}/>
        }
    }

    _confirmDatePicker = (date) => {
        console.log('A date has been picked: ', date)
        this.setState((prevState) => ({
            taskModel: {
                ...prevState.taskModel,
                remindTime: date,
            },
            isDateTimePickerVisible: false,
        }))
    }

    _cancelDatePicker = (date) => {
        this.setState((prevState) => ({
            taskModel: {
                ...prevState.taskModel,
                isRemind: false,
            },
            isDateTimePickerVisible: false,
        }))
    }

    constructor(props) {
        super(props)

        this.isCreateTask = this.props.item === undefined
        this.state = {
            taskModel: this.isCreateTask ? new TaskModel() : {...this.props.item},
            isDateTimePickerVisible: false,
        }

    }

    componentWillMount() {
        this.props.navigation.setParams({handleSave: this.saveTask})
        this.props.navigation.setParams({name: this.isCreateTask ? "添加任务" : "编辑任务"})
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput style={styles.textInput}
                           autoFocus={true}
                           multiline={true}
                           blurOnSubmit={true}
                           placeholder={'您的任务名称'}
                    // VIP https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
                           onChangeText={(taskName) => this.setState((prevState) => ({
                               taskModel: {
                                   ...prevState.taskModel,
                                   taskName,
                               }
                           }))}
                           value={this.state.taskModel.taskName}
                />

                <View style={styles.category}>
                    <Text>任务类别</Text>
                    <View style={styles.categoryButtonView}>
                        <TouchableHighlight
                            style={this.state.taskModel.status === TaskState.TaskStateTodo ? [styles.buttonSelected, styles.categoryButtonLeft] : [styles.buttonNormal, styles.categoryButtonLeft]}
                            onPress={() => {
                                this.setState((prevState) => ({
                                    taskModel: {
                                        ...prevState.taskModel,
                                        status: TaskState.TaskStateTodo,
                                    }
                                }))
                            }}>
                            <Text
                                style={this.state.taskModel.status === TaskState.TaskStateTodo ? styles.textSelected : styles.textNormal}>
                                今日待办
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={this.state.taskModel.status === TaskState.TaskStatePlan ? [styles.buttonSelected, styles.categoryButtonLeft] : [styles.buttonNormal, styles.categoryButtonLeft]}
                            onPress={() => {
                                this.setState((prevState) => ({
                                    taskModel: {
                                        ...prevState.taskModel,
                                        status: TaskState.TaskStatePlan,
                                    }
                                }))
                            }}>
                            <Text
                                style={this.state.taskModel.status === TaskState.TaskStatePlan ? styles.textSelected : styles.textNormal}>
                                未来计划
                            </Text>
                        </TouchableHighlight>
                        {/*VIP 又一种写法*/}
                        {!this.isCreateTask &&
                        <TouchableHighlight
                            style={this.state.taskModel.status === TaskState.TaskStateComplete ? [styles.buttonSelected] : [styles.buttonNormal]}
                            onPress={() => {
                                this.setState((prevState) => ({
                                    taskModel: {
                                        ...prevState.taskModel,
                                        status: TaskState.TaskStateComplete
                                    }
                                }))
                            }}>
                            <Text
                                style={this.state.taskModel.status === TaskState.TaskStateComplete ? styles.textSelected : styles.textNormal}>
                                已完成
                            </Text>
                        </TouchableHighlight>
                        }
                    </View>
                </View>

                <View style={styles.remind}>
                    <Text>提醒</Text>
                    <View style={styles.remindRightView}>

                        <Switch value={this.state.taskModel.isRemind} onValueChange={(value) => {
                            this.setState((prevState) => ({
                                taskModel: {
                                    ...prevState.taskModel,
                                    isRemind: value,
                                },
                                isDateTimePickerVisible: value,
                            }))
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

                <Toast ref="toast"/>
            </View>
        )
    }

    c_remindTime() {
        if (this.state.taskModel.isRemind) {
            return (
                <TouchableHighlight onPress={() => {
                    this.setState(s => ({
                        isDateTimePickerVisible: !s.isDateTimePickerVisible,
                    }))
                }}>
                    <View style={styles.remindTimeView}>
                        <Text>提醒时间</Text>
                        <View style={styles.remindRightView}>
                            <Text>{this.state.taskModel.remindTime.toLocaleString()}</Text>
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
                <TouchableHighlight style={styles.deleteButton} onPress={this.deleteTask}>
                    <Text style={styles.deleteButtonText}>删除任务</Text>
                </TouchableHighlight>
            )
        }
    }

    saveTask = () => {
        let aTask = this.state.taskModel
        if (aTask.taskName.trim().length <= 0) {
            Keyboard.dismiss()
            this.refs.toast.show('请输入任务名称!')
            return
        }
        if (this.isCreateTask) {
            TaskService.create(aTask)
        } else {
            TaskService.update(aTask)
        }

        this.props.navigation.goBack()
    }

    deleteTask = () => {
        let aTask = this.state.taskModel
        TaskService.delete(aTask)

        this.props.navigation.goBack()
    }

}

const mapStateToProps = (state) => {
    return {
        item: state.reducerNavigator.item
    }
}

export default connect(mapStateToProps)(CreateTaskScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        height: 80,
        fontSize: 20,
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 1,
    },
    category: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 1,
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
        borderColor: COLOR.primary,
        borderRadius: 4,
        backgroundColor: '#0000',
        width: 60,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textNormal: {
        color: COLOR.primary,
        fontSize: 12
    },
    buttonSelected: {
        borderWidth: 1,
        borderColor: COLOR.primary,
        borderRadius: 4,
        backgroundColor: COLOR.primary,
        width: 60,
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
        marginTop: 1,
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
        backgroundColor: COLOR.dangerous,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        height: 44,
    },
    deleteButtonText: {
        color: '#fff',
    },
})