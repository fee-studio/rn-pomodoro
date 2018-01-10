/**
 *  功能：
 */

import React, {PureComponent} from 'react';
import {Button, SectionList, Text, View, StyleSheet, TouchableHighlight} from "react-native";
import realm from '../../database/RealmDB'
import {TaskState} from "../../utils/GlobalData";
import {toCreateTask, toTaskScreen, toTomatoScreenWithTask} from "../../navigators/actions";
import {connect} from "react-redux";
import {COLOR} from "../../utils/Config";
import TaskService from "../../database/TaskService";

export class TaskListItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        // const {navigate,goBack,state} = this.props.navigation;
        return (
            <TouchableHighlight onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
                <View style={styles.taskListItemContainer}>
                    <View style={styles.taskListItemTop}>
                        <View style={styles.taskListItemTomatoCount}>

                        </View>
                        <View style={styles.taskListItemRemindTime}>

                        </View>
                    </View>
                    <Text>{this.props.task.taskName}</Text>
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
                <Text style={{fontSize: 12, color: COLOR.textNormal}}>{this.props.title}</Text>
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

    componentWillMount() {

    }

    render() {
        return (
            <View style={{flex: 1}}>
                {/*如果你每个组都复用一个子组件那就按照这个的结构*/}
                <SectionList
                    stickySectionHeadersEnabled={true}
                    renderItem={({item}) => <TaskListItem task={item}
                                                          onPress={() => {
                                                              if (this.props.taskScreenType === 0) {
                                                                  this.props.toCreateTaskScreen(item)
                                                              } else {
                                                                  this.props.toTomatoScreenWithTask(item)
                                                              }
                                                          }}
                                                          onLongPress={() => {
                                                              // this.props.toTomatoScreenWithTask(item);
                                                          }}
                    />}
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

    componentDidMount() {
        let aTasks = TaskService.read(this.props.taskState);

        // 初始化
        this.setupListData(aTasks);

        // Realm Notifications
        // realm.addListener('change', (sender, event) => {
        //
        // })

        /* VIP
        When using addListener(objects, changes) on React Native iOS it always returns empty on the first notification and the second notification returns what should have been in the first one.
        https://github.com/realm/realm-js/issues/927
        */
        // Collection Notifications 监听数据变化
        aTasks.addListener((tasks, changes) => {
            console.log('=======================================');
            // console.log(JSON.stringify(changes));

            this.setupListData(tasks);

            // // Update UI in response to inserted objects
            // changes.insertions.forEach((index) => {
            //     let insertedDog = tasks[index];
            //     console.log('insertedDog = ' + JSON.stringify(insertedDog));
            // });
            //
            // // Update UI in response to modified objects
            // changes.modifications.forEach((index) => {
            //     let modifiedDog = tasks[index];
            //     console.log('modifiedDog = ' + JSON.stringify(modifiedDog));
            // });
            //
            // // Update UI in response to deleted objects
            // changes.deletions.forEach((index) => {
            //     let deletedDog = tasks[index];
            //     console.log('deletedDog = ' + JSON.stringify(deletedDog));
            //     // Deleted objects cannot be accessed directly
            //     // Support for accessing deleted objects coming soon...
            // });
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    setupListData(tasks) {
        let dayItems = null;
        let dayGroup = [];

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];

            if (task.isValid()) {
                if (dayItems === null) {
                    dayItems = [];
                    dayGroup.push({data: dayItems, sectionTitle: task.actionTime.toDateString()});
                    dayItems.push(task)
                } else {
                    if (task.actionTime === null && dayItems[dayItems.length - 1].actionTime === null
                        || task.actionTime.toDateString() === dayItems[dayItems.length - 1].actionTime.toDateString()) {
                        dayItems.push(task)
                    } else {
                        dayItems = [];
                        dayGroup.push({data: dayItems, sectionTitle: task.actionTime.toDateString()});
                        dayItems.push(task)
                    }
                }
            }
        }

        // alert(JSON.stringify(dayGroup));

        this.setState({
            taskItems: dayGroup,
        });
    }

    _keyExtractor = (item, index) => index;

}

// const mapStateToProps = (state) => {
//     return {
//         item: state.nav.item
//     };
// };

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toCreateTaskScreen: (item) => dispatch(toCreateTask(item)),
        toTomatoScreenWithTask: (taskItem) => dispatch(toTomatoScreenWithTask(taskItem))
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
