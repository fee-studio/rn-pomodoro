/**
 *  功能：
 */

'use strict';
import {connect} from "react-redux";
import Utils from "../../utils/Utils";

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    WebView
} = ReactNative;


class WebViewComponent extends React.Component {

    // static navigationOptions = {
    //     title: ({state}) => `Total K:${state.params && state.params.url ? state.params.url : ''}`,
    // }
    //
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.url) {
    //         this.props.navigation.setParams({ url });
    //     }
    // }

    // static navigationOptions = (propppp) => {
    //     // const {params = {}} = navigation.state;
    //     alert(JSON.stringify(propppp))
    //     return {
    //         // title: params.url,
    //     };
    // };

    // static navigationOptions = ({navigation}) => {
    //     const {params = {}} = navigation.state;
    //     alert(JSON.stringify(navigation))
    //     return {
    //         title: params.url,
    //     };
    // };

    // static navigationOptions = {
    //     title: ({ state }) => `Chat with ${state.params.url}`
    // };

    // static navigationOptions = {
    //     title: 'Welcome',//设置标题内容
    // };

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={[styles.container]}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: this.props.navigation.state.params.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    // onNavigationStateChange={this.onNavigationStateChange}
                    // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        // url: state.reducerNavigator.url
    };
};

export default connect(mapStateToProps)(WebViewComponent)
// @connect(mapStateToProps)(WebViewComponent)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Utils.getHeaderInset(),
    },

});