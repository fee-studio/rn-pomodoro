/**
 *  功能：
 */


import React from 'react';
import {View, StyleSheet, Dimensions, Button} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import TaskListView from "./TaskListView";
import {TaskState, TaskStateTitle} from "../config/GlobalData";
import {COLOR} from "../config/Config";
import {toCreateTask} from "../navigators/actions";
import {connect} from "react-redux";

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

const todayTask = () => <TaskListView taskState={TaskState.TaskStateTodo}/>
const planTask = () => <TaskListView taskState={TaskState.TaskStatePlan}/>
const didTask = () => <TaskListView taskState={TaskState.TaskStateComplete}/>
const undoneTask = () => <TaskListView taskState={TaskState.TaskStateOverdue}/>

class TaskListScreen extends React.PureComponent {

    static navigationOptions = ({navigation, screenProps}) => ({
        headerRight: <Button title="添加" onPress={() => {
            // navigation.navigate('CreateTask')
            navigation.dispatch(toCreateTask())
            // navigation.dispatch(NavigationActions.navigate({routeName: 'CreateTask'}))
        }}/>,
    });

    state = {
        index: 0,
        routes: [
            {key: 'today', title: TaskStateTitle.TaskStateTitleTodo},
            {key: 'plan', title: TaskStateTitle.TaskStateTitlePlan},
            {key: 'did', title: TaskStateTitle.TaskStateTitleComplete},
            {key: 'undone', title: TaskStateTitle.TaskStateTitleOverdue},
        ],
    };

    _handleIndexChange = index => {
        this.setState({index});
    }

    _renderHeader = props => <TabBar {...props} style={{backgroundColor: COLOR.secondary}}/>;


    _renderScene = SceneMap({
        today: todayTask,
        plan: planTask,
        did: didTask,
        undone: undoneTask,
    });

    render() {
        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
            />
        );
    }
}


const mapStateToProps = (state) => {
    return {
        taskScreenType: state.nav.taskScreenType
    };
};


export default connect(mapStateToProps)(TaskListScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});