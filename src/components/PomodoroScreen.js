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
    Alert
} from "react-native";
import * as Progress from 'react-native-progress';
import CountdownCircle from '../libs/CountDown'
import {Tomato} from "../database/RealmDB";
import {TaskScreenType, TomatoState} from "../config/GlobalData";
import Initialization from "../config/Initialization";
import {TomatoModel} from "../models/TomatoModel";
import {connect} from "react-redux";
import {toTaskScreen} from "../navigators/actions";
import Icon from 'react-native-vector-icons/Entypo';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {COLOR} from "../config/Config";
import Circle from "react-native-progress/Circle";
import {AnimatedCircularProgress} from "react-native-circular-progress";
// import {Circle} from "react-progressbar";
import GlobalData from "../config/GlobalData";
import moment from 'moment';

const status = {
    init: 0,
    play: 1,
    pause: 2,
};

const tomatoDuration = 5; // 5秒
// const tomatoDuration = 25 * 60;

class ProgressChildView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            myStatus: this.props.playStatus || status.pause,
        };

    }

    // componentDidMount() {
    //     this.setState({
    //         myStatus: this.props.playStatus,
    //     })
    // }

    /* VIP
        react native this.setState will not re-render child component
        参考：https://stackoverflow.com/questions/30679927/react-native-this-setstate-will-not-re-render-child-component
    */
    componentWillReceiveProps(nextProps) {
        this.setState({
            myStatus: nextProps.playStatus
        })
    }

    c_stateView() {
        if (this.state.myStatus === status.init) {
            return (
                <View style={styles.progressChildView}>
                    <Icon name="controller-play" size={80} color={COLOR.primary}/>
                    {/*<Image style={styles.play}*/}
                    {/*source={require('../resources/play.png')}/>*/}
                </View>
            );
        } else if (this.state.myStatus === status.play) {
            return (
                <View style={styles.progressChildView}>
                    <Icon name="controller-paus" size={60} color={COLOR.primary}/>
                    {/*<Image style={styles.play}*/}
                    {/*source={require('../resources/pause.png')}/>*/}
                </View>
            );
        } else if (this.state.myStatus === status.pause) {
            return (
                <View style={styles.progressChildView}>
                    <Icon name="controller-play" size={80} color={COLOR.primary}/>
                    {/*<Image style={styles.play}*/}
                    {/*source={require('../resources/play.png')}/>*/}
                </View>
            );
        } else {
            return null;
        }
    }


    render() {
        return (
            this.c_stateView()
        )
    }
}


class PomodoroScreen extends Component {

    // static navigationOptions = ({navigation, screenProps}) => ({
    //     header: null,
    // });

    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            switcher: status.pause,
            animated: true,
        };


        // 进度
        // this.progress()

        // 初始化数据
        new Initialization();
    }


    componentDidMount() {
        // console.log('defaultTomatoConfig = ' + GlobalData.defaultTomatoConfig());
        // console.log('defaultTomatoConfig = ' + JSON.stringify(defaultTomatoConfig));
        // let progress = 0
        // setInterval(() => {
        //     progress += 0.01;
        //     if (progress > 1) {
        //         progress = 1;
        //     }
        //     this.setState({progress: progress});
        // }, 100);
    }

    render() {
        /*
        var options = {
            strokeWidth: 2
        };

        // For demo purposes so the container has some dimensions.
        // Otherwise progress bar won't be shown
        var containerStyle = {
            width: '200px',
            height: '200px'
        };

        return (
            <Progress.Circle
                progress={this.state.progress}
                color="#f00"
                unfilledColor="#0f0"
                borderWidth={0}
                size={200}
                thickness={10}
                showsText={true}
                strokeCap="round"
            />
        );
        */


        return (
            <View style={[styles.container]}>
                <View style={styles.progressContainer}>
                    <Text style={styles.tomatoTime}>
                        {moment(GlobalData.defaultTomatoConfig.workDuring * 1000 * (1 - this.state.progress)).format("mm:ss")}
                    </Text>

                    <TouchableWithoutFeedback onPress={this.actionToggle}>
                        <View style={styles.circleProgressView}>

                            {/*<CountdownCircle*/}
                            {/*seconds={tomatoDuration}*/}
                            {/*radius={100}*/}
                            {/*borderWidth={8}*/}
                            {/*animation={this.state.switcher}*/}
                            {/*updateText={() => {*/}
                            {/*}}*/}
                            {/*onTimeElapsed={() => {*/}
                            {/*this.setState({*/}
                            {/*switcher: status.init,*/}
                            {/*});*/}
                            {/*}}*/}
                            {/*>*/}
                            {/*<ProgressChildView playStatus={this.state.switcher}/>*/}
                            {/*</CountdownCircle>*/}

                            <Progress.Circle
                                progress={this.state.progress}
                                color={COLOR.primary}
                                unfilledColor={COLOR.backgroundNormal}
                                borderWidth={0}
                                animated={this.state.animated}
                                size={200}
                                thickness={10}
                                showsText={false}
                                strokeCap="round"
                            >
                                <ProgressChildView playStatus={this.state.switcher}/>
                            </Progress.Circle>
                        </View>
                    </TouchableWithoutFeedback>

                    <Text style={styles.tomatoTask}>PomodoroScreen22222222</Text>
                </View>
            </View>
        );
    }

    /* VIP
        onPress 必须的这么写 onPress={()=>this.actionToggle()} ，this.state.switcher 才是定义过的，
     */
    /*
    actionToggle() {
        console.log('actionPlay' + this.state.switcher);

        if (this.state.switcher === status.play) {
            this.setState({
                switcher: status.pause,
            })
        } else {
            this.setState({
                switcher: status.play,
            })
        }
    }
    */

    /* VIP
        如果这么写onPress={this.actionToggle} ，就要用以下方式定义方法。
     */
    actionToggle = () => {
        console.log('actionPlay' + this.state.switcher);

        /*
        if (this.state.switcher === status.play) {
            this.setState({
                switcher: status.pause,
            });
            // this.actionPause();
        } else {

            Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )



            this.setState({
                switcher: status.play,
            });
            // this.actionPlay();
        }
        */


        if (this.tomato === undefined) {
            this.tomato = new TomatoModel();
        }

        if (this.tomato.state === TomatoState.TomatoStateStart) {
            Alert.alert(
                '要终止这个番茄钟吗？',
                '',
                [
                    {
                        text: '不要',
                        onPress: () => console.log('goon')
                    },
                    {
                        text: '终止',
                        onPress: () => {
                            this.tomato.stop()
                            this.setState({
                                switcher: status.init,
                                progress: 0,
                                animated: false,
                            });
                            clearInterval(this.timer)
                        }
                    },
                ],
                {cancelable: false}
            )
        } else if (this.tomato.state === TomatoState.TomatoStateUnknown || this.tomato.state === TomatoState.TomatoStateCancel) {
            Alert.alert(
                '是否要先选择任务？',
                '',
                [
                    {
                        text: '暂不',
                        onPress: () => {
                            this.tomato.start();
                            this.setState({switcher: status.play});
                            let progress = 0
                            this.timer = setInterval(() => {
                                progress += 1.0 / this.tomato.workDuring;
                                this.setState({progress: progress});

                                if (progress >= 1) {
                                    progress = 0
                                    this.setState({animated: false, switcher: status.init, progress})
                                    clearInterval(this.timer)
                                }
                            }, 1000); // todo ...
                        }
                    },
                    {
                        text: '选任务',
                        onPress: () => {
                            this.props.navigation.navigate('TaskTab', {feng: 'fengyiyiiiii'})
                            // this.props.navigation.dispatch(toTaskScreen(TaskScreenType.TaskScreenTypeSelect));
                        }
                    },
                ],
                {cancelable: false}
            )
        }
    };


    actionPlay() {
        // const millisecond = 1000.0;
        // const interval = 100.0;
        // this.timerProgress = setInterval(() => {
        //     this.setState({
        //         progress: this.state.progress + 1.0 / (tomatoDuration * (millisecond / interval))
        //     });
        //
        //     if (this.state.progress >= 1) {
        //         clearInterval(this.timerProgress)
        //     }
        // }, interval)
    }

    actionPause() {
        // this.setState({
        //     progress: this.state.progress + 1.0 / (tomatoDuration * (millisecond / interval))
        // })
        // clearInterval(this.timerProgress);
    }

}


export default connect()(PomodoroScreen)


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00f',
        flex: 1,
    },
    text1: {
        backgroundColor: '#ff0',
    },
    progressContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    progressText: {
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f0',
    },
    progressChildView: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "transparent",
        // marginLeft: 5,
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
        fontSize: 35,
        color: COLOR.textNormal,

    },
    tomatoTask: {
        color: COLOR.textNormal,
        fontSize: 16,
    }

});


// var styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     image: {
//         height: 500,
//         justifyContent: "space-between",    //  <-- you can use "center", "flex-start",
//         resizeMode: "repeat",             //      "flex-end" or "space-between" here
//     },
//     instructions: {
//         textAlign: 'center',
//         color: 'white',
//         backgroundColor: "transparent",
//         fontSize: 25,
//     },
// });

