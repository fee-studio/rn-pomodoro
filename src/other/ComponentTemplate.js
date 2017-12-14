/**
 *  功能：
 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Text, View, StyleSheet} from "react-native";

// TODO: replace all xxx

class xxx extends Component {

    // ===== LIFECYCLE BEGIN =====

    constructor(props) {
        super(props);
        debugger
    }

    componentWillMount() {
        debugger
    }

    render() {
        debugger
        return (
            <View style={styles.container}>
                <Text> xxx </Text>
            </View>
        )
    }

    componentDidMount() {
        debugger
    }

    componentWillReceiveProps(nextProps) {
        debugger
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate() {
        debugger
    }

    componentDidUpdate() {
        debugger
    }

    componentWillUnmount() {
        debugger
    }

    // ===== LIFECYCLE END =====

}

const mapStateToProps = (state) => {
    debugger
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    debugger
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(xxx)


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
