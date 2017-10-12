/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from "react-native";
import * as Progress from 'react-native-progress';

export class PomodoroScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            progressValue: 0
        };

        // 进度
        // this.progress()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text1}>PomodoroScreen</Text>

                <View style={styles.progressView}>
                    <Text style={styles.progressText}>PomodoroScreen2</Text>
                    <Progress.Circle size={200} progress={this.state.progressValue}/>
                </View>
                <Progress.CircleSnail color={['red', 'green', 'blue']}/>
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
        flex:1,

    },
    text1:{
      backgroundColor:'#ff0',
    },
    progressView: {
        // width: 200,
        // height: 200,
        // marginTop:100,
        // marginLeft:100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f',
    },
    progressText: {
        // width: 200,
        // height: 200,
        // marginTop:100,
        // marginLeft:100,
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f0',
    },

});

