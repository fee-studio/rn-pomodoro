/**
 *  功能：
 */
import WebViewComponent from "./common/WebViewComponent";
import {connect} from "react-redux";

class TuCaoWebView extends WebViewComponent {

    static navigationOptions = {
        title: '吐个槽',
    };

}

export default connect()(TuCaoWebView)