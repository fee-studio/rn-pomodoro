/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from "react-native";
import * as Progress from 'react-native-progress';


class ProgressChildView extends Component {
    render() {
        return (
            <View style={styles.progressChildView}>
                <Image style={styles.play}
                       source={require('../resources/play.png')}/>
            </View>
        );
    }
}


export class PomodoroScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progressValue: 0,
            isPlaying: false,
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
                    <Progress.Circle size={200}
                                     children={<ProgressChildView/>}
                                     progress={this.state.progressValue}
                                     style={styles.progressView}>

                    </Progress.Circle>
                </View>
            </View>
        );
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
        // alignSelf: 'center',
        resizeMode: "stretch",
        backgroundColor: "transparent",
        // marginTop:-170,
    },
    pause: {}

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

