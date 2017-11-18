/**
 *  功能：
 */

import React, {PureComponent} from 'react';
import {Button, SectionList, Text, View, StyleSheet, TouchableHighlight} from "react-native";
import realm from '../database/RealmDB'
import {TaskState} from "../config/GlobalData";
import {toCreateTask, toTaskScreen} from "../navigators/actions";
import {connect} from "react-redux";
import {COLOR} from "../config/Config";

export class TaskListItem extends PureComponent {

    constructor(props) {
        super(props);

        // this.title = props.title || "default-title";
        this.task = props.task || null;
    }

    render() {

        // const {navigate,goBack,state} = this.props.navigation;

        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={styles.taskListItemContainer}>
                    <View style={styles.taskListItemTop}>
                        <View style={styles.taskListItemTomatoCount}>

                        </View>
                        <View style={styles.taskListItemRemindTime}>

                        </View>
                    </View>
                    <Text>{this.task.taskName}</Text>
                </View>
            </TouchableHighlight>

            // Swipeout component
            /*
            <Swipeout right={swipeoutBtns}>
                <View>
                    <Text>Swipe me left</Text>
                </View>
            </Swipeout>
            */
        );
    }

}

export class TaskListItemHeader extends PureComponent {
    constructor(props) {
        super(props);

        this.title = props.title || "default-title";
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ccc',
                paddingLeft: 10,
                paddingTop: 3,
                paddingBottom: 3,
                paddingRight: 10
            }}>
                <Text style={{fontSize: 12, color: COLOR.textNormal}}>{this.title}</Text>
            </View>
        );
    }
}

class TaskListView extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            taskItems: []
        };
    }

    componentDidMount() {
        let tasks = realm.objects('Task');

        // if (this.props.navigation.state.key === 'todayTask') {
        //     tasks = tasks.filtered(`status = ${TaskState.TaskStateTodo} `).sorted('actionTime')
        // } else if (this.props.navigation.state.key === 'willTask') {
        //     tasks = tasks.filtered(`status = ${TaskState.TaskStatePlan}`).sorted('actionTime')
        // } else if (this.props.navigation.state.key === 'didTask') {
        //     tasks = tasks.filtered(`status = ${TaskState.TaskStateComplete}`).sorted('actionTime', true)
        // } else if (this.props.navigation.state.key === 'unDoneTask') {
        //     tasks = tasks.filtered(`status = ${TaskState.TaskStateOverdue}`).sorted('actionTime', true)
        // }

        if (this.props.taskState === TaskState.TaskStateTodo) {
            tasks = tasks.filtered(`status = ${TaskState.TaskStateTodo}`).sorted('actionTime')
        } else if (this.props.taskState === TaskState.TaskStatePlan) {
            tasks = tasks.filtered(`status = ${TaskState.TaskStatePlan}`).sorted('actionTime')
        } else if (this.props.taskState === TaskState.TaskStateComplete) {
            tasks = tasks.filtered(`status = ${TaskState.TaskStateComplete}`).sorted('actionTime', true)
        } else if (this.props.taskState === TaskState.TaskStateOverdue) {
            tasks = tasks.filtered(`status = ${TaskState.TaskStateOverdue}`).sorted('actionTime', true)
        }

        // 初始化
        this.setupListData(tasks)

        /*
        // VIP
        When using addListener(objects, changes) on React Native iOS it always returns empty on the first notification and the second notification returns what should have been in the first one.
        https://github.com/realm/realm-js/issues/927
        */
        // 监听数据变化
        tasks.addListener((tasks, changes) => {
            this.setupListData(tasks)

            // Update UI in response to inserted objects
            changes.insertions.forEach((index) => {
                let insertedDog = tasks[index]
                console.log('insertedDog = ' + insertedDog);
            });

            // Update UI in response to modified objects
            changes.modifications.forEach((index) => {
                let modifiedDog = tasks[index]
                console.log('modifiedDog = ' + modifiedDog);
            });

            // Update UI in response to deleted objects
            changes.deletions.forEach((index) => {
                // Deleted objects cannot be accessed directly
                // Support for accessing deleted objects coming soon...
            });
        });
    }

    setupListData(tasks) {
        let dayItems = null
        let dayGroup = []

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];

            if (dayItems === null) {
                dayItems = []
                dayGroup.push({data: dayItems, sectionTitle: task.actionTime.toDateString()})
                dayItems.push(task)
            } else {
                if (task.actionTime === null && dayItems[dayItems.length - 1].actionTime === null
                    || task.actionTime.toDateString() === dayItems[dayItems.length - 1].actionTime.toDateString()) {
                    dayItems.push(task)
                } else {
                    dayItems = []
                    dayGroup.push({data: dayItems, sectionTitle: task.actionTime.toDateString()})
                    dayItems.push(task)
                }
            }
        }

        this.setState({
            taskItems: dayGroup,
        });
    }

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View style={{flex: 1}}>
                {/*<Text>{this.props.taskScreenType}</Text>*/}
                {/*如果你每个组都复用一个子组件那就按照这个的结构*/}
                <SectionList
                    stickySectionHeadersEnabled={true}
                    renderItem={({item}) => <TaskListItem task={item}
                                                          onPress={
                                                              () => this.props.toCreateTaskScreen(item)
                                                          }/>}
                    // renderItem={({item}) => <TaskListItem task={item}
                    //                                       onPress={() => {
                    //                                           // this.props.navigation.navigate('CreateTask', {task: item})
                    //                                           this.props.navigation.dispatch(toCreateTask(item))
                    //                                       }}/>}
                    renderSectionHeader={({section}) => <TaskListItemHeader title={section.sectionTitle}/>}
                    sections={this.state.taskItems}
                    ItemSeparatorComponent={() => <View style={{height: 0.5, backgroundColor: '#ccc'}}/>}
                    keyExtractor={this._keyExtractor}
                />

                {/* 如果你想要不同的组返回不同样式的子组件那就按照这个的结构返回不同的renderItem即可*/}
                {/*<SectionList sections={this.items2}*/}
                {/*renderSectionHeader={({section}) => <TaskListItemHeader title={section.sectionTitle}/>}*/}
                {/*/>*/}
            </View>
        );
    }
}


// const mapStateToProps = (state) => {
//     return {
//         item: state.nav.item
//     };
// };

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toCreateTaskScreen: (item) => dispatch(toCreateTask(item)),
    }
};

export default connect(null, mapDispatchToProps)(TaskListView)

// export class TaskListView4Todo extends TaskListView {
//     componentDidMount() {
//         const _tasks = realm.objects('Task').filtered(`status = ${TaskState.TaskStateTodo}`);
//         this.setupListData(_tasks)
//
//         // 监听数据变化
//         _tasks.addListener((tasks, changes) => {
//             this.setupListData(tasks)
//         });
//     }
//
//     setupListData(tasks) {
//         this.setState({
//             tasks: tasks,
//             taskItems: [
//                 {
//                     data: tasks,
//                     sectionTitle: "section-title-11111",
//                 }
//             ],
//         });
//     }
// }
//
// export class TaskListView4Plan extends TaskListView {
//     componentDidMount() {
//         const _tasks = realm.objects('Task');
//         this.setupListData(_tasks)
//
//         // 监听数据变化
//         _tasks.addListener((tasks, changes) => {
//             this.setupListData(tasks)
//         });
//     }
//
//     setupListData(tasks) {
//         this.setState({
//             tasks: tasks,
//             taskItems: [
//                 {
//                     data: tasks,
//                     sectionTitle: "section-title-11111",
//                 }
//             ],
//         });
//     }
// }
//
// export class TaskListView4Complete extends TaskListView {
//
// }
//
// export class TaskListView4Overdue extends TaskListView {
//
// }


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    taskListItemContainer: {
        flex: 1,
        height: 44,
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
        paddingLeft: 10,

    },
    taskListItemTop: {},
    taskListItemTomatoCount: {},
    taskListItemRemindTime: {},


});
