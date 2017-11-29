/**
 *  功能：
 */


import React from 'react';
import {View, StyleSheet, Dimensions, Button, Text} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import TaskListView from "./TaskListView";
import {TaskScreenType, TaskState, TaskStateTitle} from "../config/GlobalData";
import {COLOR} from "../config/Config";
import {toCreateTask} from "../navigators/actions";
import {connect} from "react-redux";
// import {Button} from 'antd-mobile';
// import Button from 'antd-mobile/lib/button';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

// const todayTask = () => <TaskListView taskState={TaskState.TaskStateTodo} taskScreenType={this.props.taskScreenType}/>
// const planTask = () => <TaskListView taskState={TaskState.TaskStatePlan}/>
// const didTask = () => <TaskListView taskState={TaskState.TaskStateComplete}/>
// const undoneTask = () => <TaskListView taskState={TaskState.TaskStateOverdue}/>

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

        // todayTask: () => <TaskListView taskState={TaskState.TaskStateTodo} taskScreenType={this.props.taskScreenType}/>,
        // planTask: () => <TaskListView taskState={TaskState.TaskStatePlan}/>,
        // didTask: () => <TaskListView taskState={TaskState.TaskStateComplete}/>,
        // undoneTask: () => <TaskListView taskState={TaskState.TaskStateOverdue}/>,
    };

    todayTask = () => <TaskListView taskState={TaskState.TaskStateTodo} taskScreenType={this.props.taskScreenType}/>
    planTask = () => <TaskListView taskState={TaskState.TaskStatePlan} taskScreenType={this.props.taskScreenType}/>
    didTask = () => <TaskListView taskState={TaskState.TaskStateComplete} taskScreenType={this.props.taskScreenType}/>
    undoneTask = () => <TaskListView taskState={TaskState.TaskStateOverdue} taskScreenType={this.props.taskScreenType}/>


    constructor(props) {
        super(props)

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    // todayTask = () => <TaskListView taskState={TaskState.TaskStateTodo} taskScreenType={this.props.taskScreenType}/>
    // planTask = () => <TaskListView taskState={TaskState.TaskStatePlan}/>
    // didTask = () => <TaskListView taskState={TaskState.TaskStateComplete}/>
    // undoneTask = () => <TaskListView taskState={TaskState.TaskStateOverdue}/>

    _handleIndexChange = index => {
        this.setState({index});
    }

    _renderHeader = props => <TabBar {...props} style={{backgroundColor: COLOR.secondary}}
                                     labelStyle={{fontSize: 12, margin: 3}}
        // indicatorStyle={{backgroundColor: COLOR.primary}}
    />;

    // _renderScene = SceneMap({
    //     today: this.state.todayTask,
    //     plan: this.state.planTask,
    //     did: this.state.didTask,
    //     undone: this.state.undoneTask,
    // });
    _renderScene = SceneMap({
        today: this.todayTask,
        plan: this.planTask,
        did: this.didTask,
        undone: this.undoneTask,
    });

    render() {
        return (
            <View style={styles.container}>
                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        taskScreenType: state.reducerNavigator.taskScreenType || TaskScreenType.TaskScreenTypeList,
    };
};


export default connect(mapStateToProps)(TaskListScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});