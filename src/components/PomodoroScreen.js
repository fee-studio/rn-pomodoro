/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Image, TouchableWithoutFeedback, TouchableHighlight} from "react-native";
import * as Progress from 'react-native-progress';

const status = {
    play: 1,
    pause: 2,
};


class ProgressChildView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            myStatus: this.props.playStatus || status.pause,
        };

    }

    componentDidMount() {
        this.setState({
            myStatus: this.props.playStatus,
        })
    }


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
        if (this.state.myStatus === status.play) {
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


export class PomodoroScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progressValue: 0,
            switcher: status.play,
        };

        // 进度
        // this.progress()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text1}>PomodoroScreen</Text>

                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>PomodoroScreen2</Text>
                    {/*<TouchableWithoutFeedback onPress={() => this.actionToggle()}>*/}
                    <TouchableWithoutFeedback onPress={this.actionToggle}>
                        {/*<View>*/}
                        {/*<Text>fffff</Text>*/}
                        {/*</View>*/}
                        <Progress.Circle size={200}
                                         progress={this.state.progressValue}
                                         style={styles.progressView}

                        >
                            <ProgressChildView playStatus={this.state.switcher}/>
                        </Progress.Circle>

                    </TouchableWithoutFeedback>
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

        if (this.state.switcher === status.play) {
            this.setState({
                switcher: status.pause,
            })
        } else {
            this.setState({
                switcher: status.play,
            })
        }

        // this.forceUpdate();
    }

    progress() {
        this.timerProgress = setInterval(
            () => {
                this.setState({
                    progressValue: this.state.progressValue + 0.01
                })
            },
            10
        )
    }

}

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
        backgroundColor: '#f0f',
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
    progressView: {
        justifyContent: 'center',
        alignItems: 'center',
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

