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

    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text> xxx </Text>
            </View>
        )
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }

    // ===== LIFECYCLE END =====

}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(xxx)


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
