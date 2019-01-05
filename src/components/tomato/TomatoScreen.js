/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Alert,
    InteractionManager,
    Animated,
    Easing,
    fetch,
    ART,
} from "react-native";
import * as Progress from 'react-native-progress';
import CountdownCircle from '../../libs/CountDown'
import {Tomato} from "../../database/RealmDB";
import {TaskScreenType, TomatoState, TomatoType} from "../../utils/GlobalData";
import Initialization from "../../utils/Initialization";
import TomatoModel from "../../models/TomatoModel";
import {connect} from "react-redux";
import {COLOR} from "../../utils/Config";
import Circle from "react-native-progress/Circle";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import GlobalData from "../../utils/GlobalData";
import moment from 'moment';
import TomatoService from "../../database/TomatoService";


class ProgressChildView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            myStatus: this.props.playStatus,
        };
    }

    /*
        VIP
        react native this.setState will not re-render child component
        参考：https://stackoverflow.com/questions/30679927/react-native-this-setstate-will-not-re-render-child-component
    */
    componentWillReceiveProps(nextProps) {
        this.setState({
            myStatus: nextProps.playStatus
        })
    }

    c_stateView() {
        let width = 60;
        let side = 60;
        let radius = 10;

        const path = ART.Path()
            .moveTo((width - side * Math.sin(Math.PI / 3)) / 2, width / 2)
            .lineTo((width - side * Math.sin(Math.PI / 3)) / 2, (width - side) / 2 + radius / Math.tan(Math.PI / 6))
            .arc(radius + radius * Math.sin(Math.PI / 6), -(radius * Math.cos(Math.PI / 6)), radius)
            .lineTo(width - (width - side * Math.sin(Math.PI / 3)) / 2 - (radius * Math.sin(Math.PI / 3) / Math.tan(Math.PI / 6)),
                width / 2 - (radius * Math.sin(Math.PI / 3)))
            .arc(0, 2 * (radius * Math.sin(Math.PI / 3)), radius)
            .lineTo((width - side * Math.sin(Math.PI / 3)) / 2 + (radius / Math.tan(Math.PI / 6) * Math.sin(Math.PI / 3)),
                width - (width - side) / 2 - (radius / Math.tan(Math.PI / 6) * Math.cos(Math.PI / 3)))
            .arc(-(radius + radius * Math.cos(Math.PI / 3)), -(radius * Math.sin(Math.PI / 3)), radius)
            .close();

        if (this.state.myStatus === TomatoState.TomatoStateInit) {
            return (
                <View style={styles.progressChildView}>
                    <ART.Surface width={width} height={width}>
                        <ART.Shape d={path} stroke={COLOR.primary} fill={COLOR.primary} strokeWidth={1}/>
                    </ART.Surface>
                </View>

                // <View style={styles.progressChildView}>
                //     {<Icon name="controller-play" size={80} color={COLOR.primary}/>}
                //
                //     {/*<Image style={styles.play}*/}
                //     {/*source={require('../resources/play.png')}/>*/}
                // </View>
            );
        } else if (this.state.myStatus === TomatoState.TomatoStateStart) {
            return (
                <View style={styles.progressChildView}>
                    <View style={styles.progressChildViewPause}/>
                    <View style={styles.progressChildViewPause}/>

                    {/*<Icon name="controller-paus" size={60} color={COLOR.textPrompt}/>*/}
                    {/*<Image style={styles.play}*/}
                    {/*source={require('../resources/pause.png')}/>*/}
                </View>
            );
        } else {
            return (
                <View style={styles.progressChildView}>
                    <ART.Surface width={width} height={width}>
                        <ART.Shape d={path} stroke={COLOR.primary} fill={COLOR.primary} strokeWidth={1}/>
                    </ART.Surface>
                </View>

                // <View style={styles.progressChildView}>
                //     <Icon name="controller-play" size={80} color={COLOR.primary}/>
                //     {/*<Image style={styles.play}*/}
                //     {/*source={require('../resources/play.png')}/>*/}
                // </View>
            );
        }
    }


    render() {
        return (
            this.c_stateView()
        )
    }
}

class TomatoScreen extends Component {

    // static navigationOptions = ({navigation, screenProps}) => ({
    //     header: null,
    //     tabBarOnPress: ({route, index}, jumpToIndex) => {
    //         console.log(route)
    //         console.log(index)
    //         // jumpToIndex(index)
    //
    //         // navigation.dispatch(toTaskScreen());
    //     },
    // });


    constructor(props) {
        super(props);

        this.tomatoStatus = TomatoState.TomatoStateInit;
        this.tomatoType = TomatoType.TomatoTypeInit;
        this.taskItem = null;

        this.state = {
            progress: 0,
            animated: true,
            animateProgress: new Animated.Value(0),
            tomato: null,
        };


    }


    componentDidMount() {

    }

    componentWillUpdate() {

    }

    // VIP redux props changed, to modify state value, IN HERE!!!
    componentWillReceiveProps(nextProps) {
        // if (nextProps.taskItem !== undefined) {
        //     this.actionPlay()
        // }

        if (nextProps.navigation.state.params.task_item !== undefined) {
            this.taskItem = nextProps.navigation.state.params.task_item;
            this.actionPlay()
        }
    }

    componentWillUnmount() {// 请注意Un"m"ount的m是小写
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let type = this.tomatoType;
        let status = this.tomatoStatus;
        if (this.state.tomato) {
            type = this.state.tomato.type;
            status = this.state.tomato.state;
        }
        let color = type === TomatoType.TomatoTypeInit ? COLOR.clear :
            type === TomatoType.TomatoTypeResting ? COLOR.secondary : COLOR.primary;

        let duration = this.state.tomato && this.state.tomato.state === TomatoState.TomatoStateStart ? this.state.tomato.duration : this.props.workDuration;

        return (
            <View style={[styles.container]}>
                <View style={styles.progressContainer}>
                    <Text style={styles.tomatoTime}>
                        {moment(duration * 1000.0 * (1.0 - this.state.progress)).format("mm:ss")}
                    </Text>
                    {/*<Text style={{fontSize: 35, color: COLOR.textNormal, fontWeight: 'bold', fontFamily: 'Symbol'}}>*/}
                        {/*{moment(duration * 1000.0 * (1.0 - this.status.progress)).format("mm:ss")}*/}
                    {/*</Text>*/}
                    {/*<Text style={{fontSize: 35, color: COLOR.textNormal, fontWeight: 'bold', fontFamily: 'Courier'}}>*/}
                        {/*{moment(duration * 1000.0 * (1.0 - this.status.progress)).format("mm:ss")}*/}
                    {/*</Text>*/}
                    {/*<Text style={{fontSize: 35, color: COLOR.textNormal, fontWeight: 'bold', fontFamily: 'Didot'}}>*/}
                        {/*{moment(duration * 1000.0 * (1.0 - this.status.progress)).format("mm:ss")}*/}
                    {/*</Text>*/}
                    {/*<Text style={{fontSize: 35, color: COLOR.textNormal, fontWeight: 'bold', fontFamily: 'Georgia'}}>*/}
                        {/*{moment(duration * 1000.0 * (1.0 - this.status.progress)).format("mm:ss")}*/}
                    {/*</Text>*/}
                    {/*<Text style={{fontSize: 35, color: COLOR.textNormal, fontWeight: 'bold', fontFamily: 'Verdana'}}>*/}
                        {/*{moment(duration * 1000.0 * (1.0 - this.status.progress)).format("mm:ss")}*/}
                    {/*</Text>*/}
                    {/*<Text style={{fontSize: 35, color: COLOR.textNormal, fontWeight: 'bold', }}>*/}
                        {/*{moment(duration * 1000.0 * (1.0 - this.status.progress)).format("mm:ss")}*/}
                    {/*</Text>*/}

                    <TouchableWithoutFeedback onPress={this.actionToggle}>
                        <View style={styles.circleProgressView}>
                            <Progress.Circle
                                progress={this.state.progress}
                                color={color}
                                unfilledColor={COLOR.backgroundNormal}
                                borderWidth={0}
                                animated={this.state.animated}
                                size={200}
                                thickness={10}
                                showsText={false}
                                strokeCap="round"
                            >
                                <ProgressChildView playStatus={status}/>
                            </Progress.Circle>
                        </View>
                    </TouchableWithoutFeedback>

                    <Text
                        style={styles.tomatoTask}>{this.taskItem ? this.taskItem.taskName : "番茄钟完成后，记得选择您的任务哦！"}</Text>
                </View>
            </View>
        );
    }

    /*
        VIP
        onPress 必须的这么写 onPress={()=>this.actionToggle()} ，this.state.tomatoStatus 才是定义过的，
        actionToggle() {}
    */

    /*
        VIP
        如果这么写onPress={this.actionToggle} ，就要用以下方式定义方法。
     */
    actionToggle = () => {
        if (this.tomatoStatus === TomatoState.TomatoStateStart) {
            Alert.alert('要终止这个番茄钟吗？', '', [
                    {
                        text: '不要',
                        onPress: () => console.log('goon')
                    },
                    {
                        text: '终止',
                        onPress: () => {
                            this.actionStop()
                        }
                    },
                ],
                {cancelable: false}
            )
        } else {
            if (GlobalData.tomatoConfig.isStartSelectTask) {
                Alert.alert('是否要先选择任务？', '', [
                        {
                            text: '暂不',
                            onPress: () => {
                                this.actionPlay()
                            }
                        },
                        {
                            text: '选任务',
                            onPress: () => {
                                // this.props.toTaskScreenSelect()
                                this.props.navigation.navigate('TaskListScreen4Select', {type: TaskScreenType.TaskScreenTypeSelect})
                            }
                        },
                    ],
                    {cancelable: false}
                )
            } else {
                this.actionPlay();
            }

        }
    };

    // 用动画，不用setInterval来实现进度的效果，是为了后台运行不停止进度!!!
    actionPlay() {
        // 类型转化
        if (this.tomatoType === TomatoType.TomatoTypeInit || this.tomatoType === TomatoType.TomatoTypeResting) {
            this.tomatoType = TomatoType.TomatoTypeWorking;
        } else if (this.tomatoType === TomatoType.TomatoTypeWorking) {
            this.tomatoType = TomatoType.TomatoTypeResting;
        }

        // 状态
        this.tomatoStatus = TomatoState.TomatoStateStart;

        // 数据
        let tomato = new TomatoModel(this.tomatoStatus, this.tomatoType, this.taskItem);
        this.setState({
            tomato: tomato,
        }, () => {
            TomatoService.create(this.state.tomato);
        });

        // 动画
        const totalSecond = tomato.duration;
        this.state.animateProgress.addListener(({value}) => {
            console.log("progress = " + value);
            this.setState({
                progress: value,
            })
        });
        Animated.timing(this.state.animateProgress, {
            toValue: 1,
            duration: totalSecond * 1000,
            easing: Easing.linear,
            // useNativeDriver: true, // <-- 加上这一行
        }).start(this.onEndAnimated)
    }

    actionStop() {
        // 类型
        this.tomatoType = TomatoType.TomatoTypeInit;

        // 状态
        this.tomatoStatus = TomatoState.TomatoStateCancel;

        // 数据
        this.setState(prevState => ({
            tomato: {
                ...prevState.tomato,
                type: this.tomatoType,
                state: this.tomatoStatus,
            }
        }), () => {
            TomatoService.update(this.state.tomato);
        });

        // 动画-几种停止的写法，都可以用的
        // Animated.timing(
        //     this.state.animateProgress
        // ).stop();
        // this.state.animateProgress.stopAnimation()
        this.state.animateProgress.resetAnimation();
        // VIP 很关键，要不然动画会闪一下。因为不移除监听还会监听一小段时间。
        this.state.animateProgress.removeAllListeners();

        // 状态2, 必须写后面
        this.setState({
            progress: 0,
            animateProgress: new Animated.Value(0),
        })
    }

    // VIP 动画结束时的回调，有完成时，有没完成时。
    onEndAnimated = ({finished}) => {
        if (finished) {
            // 类型 - 休息完就重置
            // if (this.tomatoType === TomatoType.TomatoTypeResting) {
            //     this.tomatoType = TomatoType.TomatoTypeInit;
            // }

            // 状态
            this.tomatoStatus = TomatoState.TomatoStateFinished;

            // 数据
            this.setState(prevState => ({
                tomato: {
                    ...prevState.tomato,
                    state: this.tomatoStatus,
                },
            }), () => {
                TomatoService.update(this.state.tomato);
            });

            // 动画
            this.state.animateProgress.resetAnimation();
            // VIP 很关键，要不然动画会闪一下。因为不移除监听还会监听一小段时间。
            this.state.animateProgress.removeAllListeners();

            // 状态2, 必须写后面
            this.setState({
                progress: 0,
                animateProgress: new Animated.Value(0),
            });

            // 如果此时是专注时间，就自动开启休息的番茄钟
            if (this.tomatoType === TomatoType.TomatoTypeWorking) {
                this.actionPlay();

                // todo
                // PushNotification.localNotification({
                //     title: "恭喜",
                //     message: "完成一个番茄钟，开始休息一下喽",
                // })

                // PushNotification.localNotificationSchedule({
                //     message: "完成一个番茄钟，该休息一下啦",
                //     date: new Date(Date.now() + (5 * 1000)) // in 60 secs
                // });
            } else if (this.tomatoType === TomatoType.TomatoTypeResting) {
                Alert.alert('休息回来', '选择您的任务，开启新的蕃茄钟', [
                        {
                            text: '继续当前任务',
                            onPress: () => {
                                this.actionPlay();
                            }
                        },
                        {
                            text: '不干啦',
                            onPress: () => {
                            }
                        },
                        {
                            text: '新任务',
                            onPress: () => {
                                this.props.toTaskScreenSelect();
                            }
                        },
                    ],
                    {cancelable: false}
                );

                // todo
                // PushNotification.localNotification({
                //     message: "休息回来，开始专注哦",
                // })

                // PushNotification.localNotificationSchedule({
                //     message: "My Notification Message2222", // (required)
                //     date: new Date(Date.now() + (5 * 1000)) // in 60 secs
                // });
            }
        } else {

        }
    };

    getMoviesFromApiAsync() {
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.movies;
            })
            .catch((error) => {
                console.error(error);
            });
    }

}

const mapStateToProps = (state) => {
    return {
        // taskItem: state.reducerNavigator.task,
        workDuration: GlobalData.tomatoConfig.duration,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // toTaskScreen: () => {
        //     dispatch(toTaskScreen())
        // },
        // toTaskScreenSelect: () => {
        //     dispatch(toTaskScreenSelectTask())
        // },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TomatoScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    progressContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressChildView: {
        position: 'absolute',
        left: 7, // 目前是个经验值
        // top: 0,
        width: 200,
        height: 200,
        borderRadius: 200.0 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: "#0f0",
        backgroundColor: "transparent",
        flexDirection: 'row',
    },
    progressChildViewPause: {
        width: 10,
        height: 40,
        borderRadius: 3,
        backgroundColor: COLOR.backgroundDarker,
        marginRight: 10,
    },
    circleProgressView: {
        margin: 50,
        width: 200,
        height: 200,
    },
    play: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: "stretch",
        backgroundColor: "transparent",
    },
    pause: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: "stretch",
        backgroundColor: "transparent",
    },
    tomatoTime: {
        fontSize: 50,
        color: COLOR.textNormal,
        fontWeight: 'bold',
        fontFamily: 'Courier'
    },
    tomatoTask: {
        color: COLOR.textNormal,
        fontSize: 16,
    },
    triangle: {
        position: 'absolute',

        // top: -20,
        // left: 50,

        marginLeft: -20,

        width: 0,
        height: 0,
        // backgroundColor: "#f00",
        // color: "#0f0",
        borderWidth: 10,
        // borderRadius: 50,
        borderStyle: "solid",

        // borderTopColor: "#00f",
        borderTopWidth: 50,
        borderTopLeftRadius: 50,

        borderBottomColor: COLOR.clear,
        borderBottomWidth: 50,


        borderLeftWidth: 100,
        borderLeftColor: COLOR.primary,

        borderRightWidth: 20,
        borderRightColor: COLOR.primary,

        transform: [{translateX: 10}, {rotateZ: "45deg"}],

    }

});

