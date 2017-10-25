/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {Component} from 'react';
import {SectionList, Text, View, StyleSheet, Image, Switch} from "react-native";
import {RealmDemo} from "../database/RealmDemo";


class SettingListItem4Content extends Component {
    constructor(props) {
        super(props);

        this.title = props.title || "";
        this.content = props.content || "";
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                {/*<View style={styles.itemTitleView}>*/}
                <Text style={styles.itemTitle}>{this.title}</Text>
                {/*</View>*/}

                {/*<View style={styles.itemContentView}>*/}
                {/*</View>*/}

                <View style={styles.itemContentRight}>
                    <Text style={styles.itemContent}>{this.content}</Text>
                    <Image style={styles.itemArrowRight} source={require('../resources/arrow_right.png')}/>
                </View>


            </View>
        )
    }
}

class SettingListItem4OnOff extends Component {
    constructor(props) {
        super(props);

        this.title = props.title || "";
        this.onOff = props.onOff || false;
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{this.title}</Text>
                <Switch style={styles.itemOnOff} value={this.onOff}/>
            </View>
        );
    }
}

class SettingListItemHeader extends Component {
    constructor(props) {
        super(props);

        this.title = props.title || "";
    }

    render() {
        return (
            <View style={styles.listHeader}>
                <Text style={styles.listHeaderTitle}>{this.title}</Text>
            </View>
        );
    }
}


export default class SettingScreen extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({
        title: "设置",
        // headerRight: <Button title="添加" onPress={() => {
        //     console.log('add :' + JSON.stringify(navigation));
        //     navigation.navigate('CreateTask')
        // }}/>,
    });

    constructor(props) {
        super(props);

        this.items = [
            {
                data: [
                    {title: '每日番茄目标', key: 'data-key-31', content: '8个', onOff: false},
                    {title: '番茄时长', key: 'data-key-32', content: '3秒', onOff: false},
                    {title: '休息时长', key: 'data-key-33', content: '5分钟', onOff: false},
                ],
                sectionTitle: "目标和时间",
                renderItem: ({item}) => <SettingListItem4Content title={item.title} content={item.content}/>,
            },
            {
                data: [
                    {title: '开启番茄钟时提醒选择任务', key: 'data-key-21', content: '', onOff: true},
                    {title: '桌面图标为今日待办数', key: 'data-key-22', content: '', onOff: true},
                    {title: '早9晚9提醒', key: 'data-key-23', content: '', onOff: false},
                ],
                sectionTitle: "其他",
                renderItem: ({item}) => <SettingListItem4OnOff title={item.title} onOff={item.onOff}/>,
            },
            {
                data: [
                    {title: '评价，鼓励我', key: 'data-key-11',},
                    {title: '反馈，改进我', key: 'data-key-12',},
                    // {title: 'data-title-13', key: 'data-key-13',},
                ],
                sectionTitle: "",
                renderItem: ({item}) => <SettingListItem4Content title={item.title}/>,
            },
        ];
    }


    render() {
        return (
            // VIP: 最外层的view，一定要flex:1
            <View style={styles.container}>
                {/* 如果你想要不同的组返回不同样式的子组件那就按照这个的结构返回不同的renderItem即可*/}
                <SectionList sections={this.items}
                             renderSectionHeader={({section}) => <SettingListItemHeader title={section.sectionTitle}/>}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listHeader: {
        backgroundColor: '#0000',
        height: 44,
        justifyContent: 'center',
    },
    listHeaderTitle: {
        marginLeft: 10,
        marginBottom: -10,
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
