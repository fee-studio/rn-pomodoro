import React, {Component} from 'react';
import {connect} from "react-redux";
import {Text, View, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
var ScrollableTabView = require('react-native-scrollable-tab-view');


class TaskList2Screen extends Component {

    // ===== LIFECYCLE BEGIN =====

    static propTypes = {
        title: PropTypes.string,
    };

    static defaultProps = {
        title: ""
    };

    state = {};

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

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList2Screen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
