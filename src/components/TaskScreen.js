/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {PureComponent} from 'react';
import {Button, SectionList, Text, View, StyleSheet, TouchableHighlight} from "react-native";
import realm from '../database/RealmDB'
import {StackRouter, TabNavigator} from "react-navigation";
import {TaskListView} from "./TaskListView";
import {TaskState, TaskStateTitle} from "../config/GlobalData";


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

export default class TaskScreen extends PureComponent {

    static navigationOptions = ({navigation, screenProps}) => ({
        title: "任务清单",
        headerRight: <Button title="添加" onPress={() => {
            navigation.navigate('CreateTask')
        }}/>,
    });

    render() {
        return (
            <View style={{flex: 1}}>
                <TasksTabs navigation={this.props.navigation}/>
            </View>
        );
    }
}

// VIP https://reactnavigation.org/docs/intro/nesting
TaskScreen.router = TasksTabs.router;


