/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {PureComponent} from 'react';
import {Button, SectionList, Text, View, StyleSheet, TouchableHighlight} from "react-native";
import realm from '../database/RealmDB'
import {StackRouter, TabNavigator} from "react-navigation";
import TaskListView from "./TaskListView";
import {TaskScreenType, TaskState, TaskStateTitle} from "../utils/GlobalData";
import {NAV_TO_CREATE_TASK} from "../navigators/actionTypes";
import {NavigationActions} from 'react-navigation';
import {toCreateTask} from "../navigators/actions";
import {connect} from "react-redux";


export const TasksTabs = TabNavigator(
    {
        todayTask: {
            screen: TaskListView,
            navigationOptions: {
                _type: TaskState.TaskStateTodo,
                title: TaskStateTitle.TaskStateTitleTodo,
                // tabBarLabel: TaskStateTitle.TaskStateTitleTodo, // VIP 这个会改变下面的主tabbar的名字，不用这个
            },
        },
        willTask: {
            screen: TaskListView,
            navigationOptions: {
                _type: TaskState.TaskStatePlan,
                title: TaskStateTitle.TaskStateTitlePlan,
            },
        },
        didTask: {
            screen: TaskListView,
            navigationOptions: {
                _type: TaskState.TaskStateComplete,
                title: TaskStateTitle.TaskStateTitleComplete,
            },
        },
        unDoneTask: {
            screen: TaskListView,
            navigationOptions: {
                _type: TaskState.TaskStateOverdue,
                title: TaskStateTitle.TaskStateTitleOverdue,
            },
        },
    },
    {
        tabBarPosition: 'top',
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
            showIcon: false,
            style: {height: 40},
            labelStyle: {fontSize: 12, justifyContent: 'center', alignItems: 'center', marginTop: 5}
        }
    }
);

class TaskScreen extends PureComponent {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerRight: <Button title="添加" onPress={() => {
            // navigation.navigate('CreateTask')
            navigation.dispatch(toCreateTask())
            // navigation.dispatch(NavigationActions.navigate({routeName: 'CreateTask'}))
        }}/>,
    });

    constructor(props) {
        super(props)

        console.log("this.props = " + this.props)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TasksTabs/>
                {/*<TasksTabs navigation={this.props.navigation}/>*/}
                {/*<TasksTabs navigation={this.props.navigation} type={false}/>*/}
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        taskScreenType: state.reducerNavigator.taskScreenType
    };
};


export default connect(mapStateToProps)(TaskScreen)


/// VIP https://reactnavigation.org/docs/intro/nesting
TaskScreen.router = TasksTabs.router;


