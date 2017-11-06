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
import {TomatoModel} from "../models/Models";
import {connect} from "react-redux";
import {toTaskScreen} from "../navigators/actions";

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
                    <Image style={styles.play}
                           source={require('../resources/play.png')}/>
                </View>
            );
        } else if (this.state.myStatus === status.play) {
            return (
                <View style={styles.progressChildView}>
                    <Image style={styles.play}
                           source={require('../resources/pause.png')}/>
                </View>
            );
        } else if (this.state.myStatus === status.pause) {
            return (
                <View style={styles.progressChildView}>
                    <Image style={styles.play}
                           source={require('../resources/play.png')}/>
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
            progressValue: 0,
            switcher: status.pause,
        };

        // 进度
        // this.progress()

        // 初始化数据
        new Initialization();
    }


    componentDidMount() {
        // console.log('DefaultTomatoConfig = ' + GlobalData.defaultTomatoConfig());
        // console.log('DefaultTomatoConfig = ' + JSON.stringify(DefaultTomatoConfig));

    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={styles.progressContainer}>
                    <Text style={styles.tomatoTime}>PomodoroScreen2</Text>

                    <TouchableWithoutFeedback onPress={this.actionToggle}>
                        <View style={styles.circleProgressView}>
                            <CountdownCircle
                                seconds={tomatoDuration}
                                radius={100}
                                borderWidth={8}
                                animation={this.state.switcher}
                                updateText={() => {
                                }}
                                onTimeElapsed={() => {
                                    this.setState({
                                        switcher: status.init,
                                    });
                                }}
                            >
                                <ProgressChildView playStatus={this.state.switcher}/>
                            </CountdownCircle>
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

        let tomato = new TomatoModel();
        if (tomato.state === TomatoState.TomatoStateStart) {
            Alert.alert(
                '要终止这个番茄钟吗？',
                '',
                [
                    {text: '不要', onPress: () => console.log('Ask me later pressed')},
                    {text: '终止', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                {cancelable: false}
            )
        } else if (tomato.state === TomatoState.TomatoStateUnknown || tomato.state === TomatoState.TomatoStateCancel) {
            Alert.alert(
                '是否要先选择任务？',
                '',
                [
                    {
                        text: '暂不',
                        onPress: () => {
                            this.setState({
                                switcher: status.play,
                            });
                            tomato.start();
                        }
                    },
                    {
                        text: '选任务',
                        onPress: () => {
                            this.props.navigation.navigate('TaskTab', {feng: 'fengyiyiiiii'})
                            // this.props.navigation.dispatch(toTaskScreen(TaskScreenType.TaskScreenTypeSelect));
                        }, style: 'cancel'
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
        //         progressValue: this.state.progressValue + 1.0 / (tomatoDuration * (millisecond / interval))
        //     });
        //
        //     if (this.state.progressValue >= 1) {
        //         clearInterval(this.timerProgress)
        //     }
        // }, interval)
    }

    actionPause() {
        // this.setState({
        //     progressValue: this.state.progressValue + 1.0 / (tomatoDuration * (millisecond / interval))
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
    tomatoTime: {},
    tomatoTask: {}

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

