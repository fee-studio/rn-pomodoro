/**
 *  功能：
 */


import React from 'react'
import {View, StyleSheet, Dimensions, Button, Text, TouchableHighlight, TouchableWithoutFeedback} from 'react-native'
import {TabBar, SceneMap, TabView} from 'react-native-tab-view'
import TaskListView from "./TaskListView"
import {TaskScreenType, TaskState, TaskStateTitle} from "../../utils/GlobalData"
import {COLOR} from "../../utils/Config"
import {connect} from "react-redux"
import ScrollableTabView, {DefaultTabBar,} from 'react-native-scrollable-tab-view';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import DIYIcon from "../../modules/iconfont/DIYIcon";
// import {Button} from 'antd-mobile';
// import Button from 'antd-mobile/lib/button';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
}

class TaskListScreen extends React.PureComponent {

    static navigationOptions = ({navigation, screenProps}) => ({
        // headerRight: <TouchableWithoutFeedback style={styles.headerRightBtn} onPress={() => {
        //     navigation.dispatch(toCreateTask())
        // }}>
        //     <View>
        //         <Text style={{color: COLOR.blue, fontSize: 18, width: 50,}}>添加</Text>
        //     </View>
        // </TouchableWithoutFeedback>,

        // headerRight: <Button title="添加"
        //                      color={COLOR.secondary}
        //                      backgroundColor={COLOR.clear}
        //                      borderRadius={12}
        //                      fontSize={11}
        //                      buttonStyle={{paddingTop: 5, paddingBottom: 5, paddingLeft: 8, paddingRight: 8, marginRight:10}}
        //                      onPress={() => {
        //                          navigation.dispatch(toCreateTask())
        //                          // navigation.navigate('CreateTask')
        //                          // navigation.dispatch(NavigationActions.navigate({routeName: 'CreateTask'}))
        //                      }}/>,
    })

    state = {
        index: 0,
        routes: [
            {key: 'today', title: TaskStateTitle.TaskStateTitleTodo},
            {key: 'plan', title: TaskStateTitle.TaskStateTitlePlan},
            {key: 'did', title: TaskStateTitle.TaskStateTitleComplete},
            {key: 'undone', title: TaskStateTitle.TaskStateTitleOverdue},
        ],
        // type: this.props.navigation.state.params.type !== undefined ? this.props.navigation.state.params.type : TaskScreenType.TaskScreenTypeList
    }

    todayTask = () => <TaskListView taskState={TaskState.TaskStateTodo}/>
    planTask = () => <TaskListView taskState={TaskState.TaskStatePlan}/>
    didTask = () => <TaskListView taskState={TaskState.TaskStateComplete}/>
    undoneTask = () => <TaskListView taskState={TaskState.TaskStateOverdue}/>

    // todayTask = () => <TaskListView taskState={TaskState.TaskStateTodo} taskScreenType={this.type}/>
    // planTask = () => <TaskListView taskState={TaskState.TaskStatePlan} taskScreenType={this.type}/>
    // didTask = () => <TaskListView taskState={TaskState.TaskStateComplete} taskScreenType={this.type}/>
    // undoneTask = () => <TaskListView taskState={TaskState.TaskStateOverdue} taskScreenType={this.type}/>

    // todayTask = () => <TaskListView taskState={TaskState.TaskStateTodo} taskScreenType={this.props.navigation.state.params.type}/>
    // planTask = () => <TaskListView taskState={TaskState.TaskStatePlan} taskScreenType={this.props.navigation.state.params.type}/>
    // didTask = () => <TaskListView taskState={TaskState.TaskStateComplete} taskScreenType={this.props.navigation.state.params.type}/>
    // undoneTask = () => <TaskListView taskState={TaskState.TaskStateOverdue} taskScreenType={this.props.navigation.state.params.type}/>
    //
    constructor(props) {
        super(props)

        // if (this.props.navigation.state.params.type !== undefined) {
        //     // this.type = this.props.navigation.state.params.type;
        // }

        // alert(JSON.stringify(this.props.navigation.state.params))
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    _handleIndexChange = index => {
        this.setState({index})
    }

    _renderHeader = props => <TabBar {...props} style={{backgroundColor: COLOR.backgroundLighter}}
                                     labelStyle={{fontSize: 12, margin: 3, color: COLOR.primary}}
        // scrollEnabled={false}
        // scrollEnabled={this.props.tabViewScrollable}
                                     indicatorStyle={{backgroundColor: COLOR.primary}}
    />

    _renderScene = SceneMap({
        today: this.todayTask,
        plan: this.planTask,
        did: this.didTask,
        undone: this.undoneTask,
    })


    _onPress4CreateTask = () => {
        this.props.navigation.navigate('CreateTask', {item:null})
    }

    render() {
        return (
            <View style={styles.container}>

                <TabView
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />


                <TouchableHighlight
                    style={styles.btn4CreateTask}
                    onPress={this._onPress4CreateTask}>
                    <View>
                        {/*<Icon name="plus" size={60} color={COLOR.textLightNormal}/>*/}
                        <DIYIcon name="add" size={40} color={COLOR.textLightNormal}/>
                        {/*<DIYIcon name={'add'} size={'50'} color={COLOR.textLightNormal} />*/}
                    </View>
                </TouchableHighlight>

                {/*<ScrollableTabView*/}
                {/*style={{marginTop: 20,}}*/}
                {/*initialPage={1}*/}
                {/*renderTabBar={() => <DefaultTabBar/>}*/}
                {/*locked={!this.props.tabViewScrollable}*/}
                {/*>*/}

                {/*<TaskListView tabLabel='Tab #111' taskState={TaskState.TaskStateTodo}*/}
                {/*taskScreenType={this.props.taskScreenType}/>*/}
                {/*<TaskListView tabLabel='Tab #122' taskState={TaskState.TaskStatePlan}*/}
                {/*taskScreenType={this.props.taskScreenType}/>*/}
                {/*<TaskListView tabLabel='Tab #133' taskState={TaskState.TaskStateComplete}*/}
                {/*taskScreenType={this.props.taskScreenType}/>*/}
                {/*<TaskListView tabLabel='Tab #144' taskState={TaskState.TaskStateOverdue}*/}
                {/*taskScreenType={this.props.taskScreenType}/>*/}

                {/*</ScrollableTabView>*/}

            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        // taskScreenType: state.reducerNavigator.taskScreenType || TaskScreenType.TaskScreenTypeList,
        tabViewScrollable: state.reducerTask.scrolling
    }
}


export default connect(mapStateToProps)(TaskListScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRightBtn: {
        width: 60,
        alignItems: 'center',
    },
    btn4CreateTask: {
        width: 60,
        height: 60,
        borderRadius:30,
        position: "absolute", // 悬浮的效果
        right: 20,
        bottom: 20,
        backgroundColor:  '#ff6347dd', // 半透明效果
        justifyContent: "center",
        alignItems: 'center',
    }
});