/**
 *  功能：
 */

import React, {PureComponent} from 'react';
import {Button, SectionList, Text, View, StyleSheet, TouchableHighlight, TouchableNativeFeedback} from "react-native";
import realm from '../../database/RealmDB'
import {TaskScreenType, TaskState} from "../../utils/GlobalData";
import {connect} from "react-redux";
import {COLOR} from "../../utils/Config";
import TaskService from "../../database/TaskService";
import moment from 'moment';
import {SwipeListView} from 'react-native-swipe-list-view';
import Swipeable from 'react-native-swipeable';
import Swipeout from 'react-native-swipeout';
import {actionItemScrolling} from "./actions";
import {withNavigation} from "react-navigation";
import LinearGradient from "react-native-linear-gradient";


export class TaskListItem extends PureComponent {

    swipeable = null;

    handleUserBeganScrollingParentView() {
        this.swipeable.recenter();
    }

    state = {
        scrollEnabled: false,
    }

    constructor(props) {
        super(props);

        moment.locale()

        let leftContent = <Text>Pull to activate</Text>;

        let rightButtons = [
            <TouchableHighlight><Text>Button 11111</Text></TouchableHighlight>,
            <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
        ];
    }

    render() {
        var swipeoutBtns = [
            {
                text: 'Button'
            }
        ]

        // const {navigate,goBack,state} = this.props.navigation;
        return (
            // /*
            <TouchableNativeFeedback style={styles.itemContainer} onPress={this.props.onPress}
                                     onLongPress={this.props.onLongPress}>
                <View style={styles.taskListItemContainer}>
                    <View style={styles.taskListItemTop}>
                        <View style={styles.taskListItemTomatoCount}>

                        </View>
                        <View style={styles.taskListItemRemindTime}>

                        </View>
                    </View>
                    <Text>{this.props.task.taskName}</Text>
                </View>
            </TouchableNativeFeedback>
            // */

            // Swipeout component
            // /*

            // Swipeout比较卡
            /*
            <Swipeout autoClose={true}
                      right={swipeoutBtns}
                      scroll={scrollable => {
                          this.props.a_scrolling(scrollable)
                      }}
                      sensitivity={100}
            >
                <View style={styles.taskListItemContainer}>
                    <Text>Swipe me left111 {this.state.scrollEnabled}</Text>
                </View>
            </Swipeout>
            */

            /*
            <Swipeable style={styles.taskListItemContainer}
                       onSwipeStart={()=>this.props.a_scrolling(true)}
                       onSwipeRelease={() => this.props.a_scrolling(false)}
                       leftContent={leftContent}
                       rightButtons={rightButtons}>
                <Text>My swipeable content</Text>
            </Swipeable>
            */

            /*
            <Swipeable onRef={ref => this.swipeable = ref} rightButtons={rightButtons}>
                <Text>My swipeable content</Text>
            </Swipeable>
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
                backgroundColor: COLOR.backgroundNormalAlpha,
                paddingLeft: 10,
                paddingTop: 1,
                paddingBottom: 1,
                paddingRight: 10,
                height:20,
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
                {/*渐变*/}
                <LinearGradient colors={['#8D9AFC', '#498AC3']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} >
                    {/*如果你每个组都复用一个子组件那就按照这个的结构*/}
                    <SectionList
                        stickySectionHeadersEnabled={true}
                        renderItem={({item}) => <TaskListItem task={item}
                                                              onPress={() => {
                                                                  if (this.props.navigation.state.params === undefined
                                                                      || this.props.navigation.state.params.type === TaskScreenType.TaskScreenTypeList) {
                                                                      // this.props.toCreateTaskScreen(item)
                                                                      this.props.navigation.navigate('CreateTask', {item: item})
                                                                  } else {
                                                                      // this.props.toTomatoScreenWithTask(item)
                                                                      this.props.navigation.navigate('TomatoScreen', {task_item: item})
                                                                      // this.props.navigation.goBack();
                                                                  }
                                                              }}
                                                              a_scrolling={(scrolling) => {
                                                                  this.props.a_scrolling(scrolling)
                                                              }}
                                                              onLongPress={() => {
                                                                  // this.props.toTomatoScreenWithTask(item);
                                                              }}
                        />}
                        renderSectionHeader={({section}) => <TaskListItemHeader title={section.sectionTitle}/>}
                        sections={this.state.taskItems}
                        // ItemSeparatorComponent={() => <View style={{height: 0.5, backgroundColor: '#ccc'}}/>}
                        keyExtractor={this._keyExtractor}
                    />

                </LinearGradient>

                {/* 如果你想要不同的组返回不同样式的子组件那就按照这个的结构返回不同的renderItem即可*/}
                {/*<SectionList sections={this.items2}*/}
                {/*renderSectionHeader={({section}) => <TaskListItemHeader title={section.sectionTitle}/>}*/}
                {/*/>*/}

                {/*<SwipeListView*/}
                {/*useFlatList*/}
                {/*data={this.state.taskItems}*/}
                {/*renderItem={(data, rowMap) => (*/}
                {/*<View style={styles.rowFront}>*/}
                {/*<Text>I am {data.item} in a SwipeListView</Text>*/}
                {/*</View>*/}
                {/*)}*/}
                {/*renderHiddenItem={(data, rowMap) => (*/}
                {/*<View style={styles.rowBack}>*/}
                {/*<Text>Left</Text>*/}
                {/*<Text>Right</Text>*/}
                {/*</View>*/}
                {/*)}*/}
                {/*leftOpenValue={75}*/}
                {/*rightOpenValue={-75}*/}
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
                    dayGroup.push({data: dayItems, sectionTitle: moment(task.actionTime).format('YYYY-MM-DD dddd')});
                    dayItems.push(task)
                } else {
                    if (task.actionTime === null && dayItems[dayItems.length - 1].actionTime === null
                        || task.actionTime.toDateString() === dayItems[dayItems.length - 1].actionTime.toDateString()) {
                        dayItems.push(task)
                    } else {
                        dayItems = [];
                        dayGroup.push({
                            data: dayItems,
                            sectionTitle: moment(task.actionTime).format('YYYY-MM-DD dddd')
                        });
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

    _keyExtractor = (item, index) => index.toString();

}

// const mapStateToProps = (state) => {
//     return {
//         item: state.nav.item
//     };
// };

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // toCreateTaskScreen: (item) => dispatch(toCreateTask(item)),
        // toTomatoScreenWithTask: (taskItem) => dispatch(toTomatoScreenWithTask(taskItem)),
        a_scrolling: (scrolling) => dispatch(actionItemScrolling(scrolling)),
    }
};

// withNavigation 是一个高阶组件，它可以将navigation这个 prop 传递到一个包装的组件。
// 当你无法直接将navigation 这个 prop 传递给组件，或者不想在深度嵌套的子组件中传递它时，它将非常有用。
export default withNavigation(connect(null, mapDispatchToProps)(TaskListView))

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
    itemContainer: {
        backgroundColor: COLOR.clear,

    },
    taskListItemContainer: {
        flex: 1,
        height: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        // backgroundColor: '#fff',
        // paddingLeft: 10,
        padding: 10,
        backgroundColor: COLOR.backgroundLighter,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
    },
    taskListItemTop: {},
    taskListItemTomatoCount: {},
    taskListItemRemindTime: {},


});
