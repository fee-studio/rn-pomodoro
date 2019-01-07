/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {Component} from 'react';
import {SectionList, Text, View, StyleSheet, Image, Switch, TouchableHighlight, NativeModules} from "react-native";
import {RealmDemo} from "../../database/RealmDemo";
import Picker from 'react-native-picker';
import {COLOR} from "../../utils/Config";
import GlobalData, {TaskState} from "../../utils/GlobalData";
import {connect} from "react-redux";
import NotificationManager from "../../utils/NotificationManager";
import TaskService from "../../database/TaskService";
import Utils from "../../utils/Utils"

let PushNotification = require('react-native-push-notification');

class SettingListItem4Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{this.props.title}</Text>
                    <View style={styles.itemContentRight}>
                        <Text style={styles.itemContent}>{this.props.content}</Text>
                        <Image style={styles.itemArrowRight} source={require('../../resources/arrow_right.png')}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

class SettingListItem4OnOff extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{this.props.title || ''}</Text>
                <Switch style={styles.itemOnOff} value={this.props.onOff || false}
                        onValueChange={this.props.onValueChange}/>
            </View>
        );
    }
}

class SettingListItemHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.listHeader}>
                <Text style={styles.listHeaderTitle}>{this.props.title || ''}</Text>
            </View>
        );
    }
}


class SettingScreen extends Component {


    static navigationOptions = ({navigation, screenProps}) => ({
        // title: "设置",
        // headerRight: <Button title="添加" onPress={() => {
        //     console.log('add :' + JSON.stringify(navigation));
        //     navigation.navigate('CreateTask')
        // }}/>,
    });

    constructor(props) {
        super(props);

        this.state = {
            // dailyTargetCount: 8,
            // duration: 100,
            // restDuring: 30,
            listItems: [],
        }
    }

    aListItems() {
        return [
            {
                data: [
                    {
                        title: '每日番茄目标',
                        key: 'key-daily-tomato-count',
                        content: `${GlobalData.tomatoConfig.dailyTargetCount}个`,
                        onOff: false
                    },
                    {
                        title: '番茄时长/专注时长',
                        key: 'key-work-during',
                        content: `${(GlobalData.tomatoConfig.duration / 60).toFixed(0)}分钟`, //todo
                        onOff: false
                    },
                    {
                        title: '休息时长',
                        key: 'key-rest-during',
                        content: `${(GlobalData.tomatoConfig.shortRestDuration / 60).toFixed(0)}分钟`,
                        onOff: false
                    },
                ],
                sectionTitle: "目标和时间",
                renderItem: ({item}) => <SettingListItem4Content title={item.title}
                                                                 content={item.content}
                                                                 onPress={() => (this._actionTargetAndTime(item))}/>,
            },
            {
                data: [
                    {
                        title: '开启番茄钟时提醒选择任务',
                        key: 'key-tomato-task',
                        content: '',
                        onOff: GlobalData.tomatoConfig.isStartSelectTask
                    },
                    {
                        title: '桌面图标为今日待办数',
                        key: 'key-show-todo-count',
                        content: '',
                        onOff: GlobalData.tomatoConfig.showTodoCount
                    },
                    {
                        title: '早9晚9提醒',
                        key: 'key-morning-evening',
                        content: '',
                        onOff: GlobalData.tomatoConfig.notice4MorningEvening
                    },
                ],
                sectionTitle: "提醒和通知",
                renderItem: ({item}) => <SettingListItem4OnOff title={item.title}
                                                               onOff={item.onOff}
                                                               onValueChange={() => (this._actionOther(item))}/>,
            },
            {
                data: [
                    // {title: '评价，鼓励我', key: 'key-evaluation',},
                    {title: '反馈，改进我', key: 'key-feedback',},
                    // {title: 'data-title-13', key: 'data-key-13',},
                ],
                sectionTitle: "其他",
                renderItem: ({item}) => <SettingListItem4Content title={item.title}
                                                                 onPress={() => (this._actionAdditional(item))}/>,
            },
        ];
    }

    _actionTargetAndTime(item) {
        let data = [];
        let selectedValue = [];
        let pickerTitleText = '';
        if (item.key === 'key-daily-tomato-count') {
            data = [3, 5, 8, 10]
            selectedValue = [8]
            pickerTitleText = '每日番茄目标'
        } else if (item.key === 'key-work-during') {
            data = [20, 25, 30, 45, 50]
            // data = [20 * 60, 25 * 60, 30 * 60, 45 * 60, 60 * 60]
            selectedValue = [25]
            // selectedValue = [25 * 60]
            pickerTitleText = '番茄时长/专注时长'
        } else if (item.key === 'key-rest-during') {
            data = [5, 10, 15]
            // data = [5 * 60, 10 * 60, 15 * 60]
            selectedValue = [5]
            // selectedValue = [5 * 60]
            pickerTitleText = '休息时长'
        }

        Picker.init({
            pickerData: data,
            selectedValue: selectedValue,
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnColor: [255, 255, 255, 1],
            pickerCancelBtnColor: [255, 255, 255, 1],
            pickerTitleText: pickerTitleText,
            pickerTitleColor: [255, 255, 255, 1],
            pickerToolBarBg: [48, 160, 160, 1],
            pickerBg: [255, 255, 255, 1],
            onPickerConfirm: data => {
                if (item.key === 'key-daily-tomato-count') {
                    GlobalData.tomatoConfig.dailyTargetCount = parseInt(data[0]);
                } else if (item.key === 'key-work-during') {
                    GlobalData.tomatoConfig.duration = parseInt(data[0]) * 60;
                } else if (item.key === 'key-rest-during') {
                    GlobalData.tomatoConfig.shortRestDuration = parseInt(data[0]) * 60;
                }
                this.setState({
                    listItems: [... this.aListItems(),]
                })
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    }

    _actionOther(item) {
        if (item.key === 'key-tomato-task') {
            GlobalData.tomatoConfig.isStartSelectTask = !GlobalData.tomatoConfig.isStartSelectTask;
        } else if (item.key === 'key-show-todo-count') {
            GlobalData.tomatoConfig.showTodoCount = !GlobalData.tomatoConfig.showTodoCount;
            Utils.setupApplicationIconBadgeNumber();
        } else if (item.key === 'key-morning-evening') {
            GlobalData.tomatoConfig.notice4MorningEvening = !GlobalData.tomatoConfig.notice4MorningEvening;

            GlobalData.tomatoConfig.notice4MorningEvening ? NotificationManager.setupMorningEveningNotice()
                : NotificationManager.removeMorningEveningNotice();
        }

        this.setState({
            listItems: [... this.aListItems(),]
        })
    }

    _actionAdditional(item) {
        if (item.key === 'key-evaluation') {
            // todo ...
        } else if (item.key === 'key-feedback') {
            // this.props.toTuCaoWebView("https://support.qq.com/products/17202")
            this.props.navigation.push('TuCaoWebView',{url:"http://support.qq.com/product/51534"});
            // this.props.navigation.navigate('TuCaoWebView',{url:"http://support.qq.com/product/51534"});
        }
    }

    componentWillUpdate(nextProps, nextState) {
        // alert("nextProps -- " + JSON.stringify(nextProps)) // todo ...
        // alert("nextState -- " + JSON.stringify(nextState)) // todo ...
        // alert("thisState -- " + JSON.stringify(this.state)) // todo ...
        // if (nextState.dailyTargetCount !== this.state.dailyTargetCount) {
        //     alert('will update')
        //     this.setState({
        //         dailyTargetCount: nextState.dailyTargetCount,
        //
        //     })
        // }
    }

    componentDidMount() {
        this.setState({
            listItems: this.aListItems(),
        })
    }

    render() {
        return (
            // VIP: 最外层的view，一定要flex:1
            <View style={styles.container}>
                {/* 如果你想要不同的组返回不同样式的子组件那就按照这个的结构返回不同的renderItem即可*/}
                <SectionList sections={this.state.listItems}
                             renderSectionHeader={({section}) => <SettingListItemHeader title={section.sectionTitle}/>}
                             ListFooterComponent={<View style={{height: 40, backgroundColor: '#0000'}}/>}
                             stickySectionHeadersEnabled={false}
                />
            </View>
        );
    }

    componentWillMount() {

    }

    componentWillUnmount() {
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // toWebView: (url) => dispatch(toWebViewComponent(url)),
        // toTuCaoWebView: (url) => dispatch(toTuCaoWebView(url)),
    }
};

export default connect(null, mapDispatchToProps)(SettingScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#eee',
        ...Utils.getHeaderInset(),
    },
    listHeader: {
        backgroundColor: '#0000',
        height: 40,
        justifyContent: 'center',
    },
    listHeaderTitle: {
        marginLeft: 10,
        marginBottom: -10,
        color:COLOR.textNormal,
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 44,
        borderColor: '#ccc',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemContentView: {
        marginRight: 10,
        justifyContent: 'center',
    },
    itemTitleView: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    itemTitle: {
        marginLeft: 10,
    },
    itemArrowRightView: {
        marginRight: 10,
        justifyContent: 'center',
    },
    itemArrowRight: {
        width: 20,
        height: 20,
    },
    itemContentRight: {
        flexDirection: 'row',
        marginRight: 10,
    },
    itemOnOff: {
        marginRight: 10,
    },
    itemContent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        color: '#666'
    },

});
