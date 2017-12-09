/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {Component, PureComponent} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableHighlight, TouchableWithoutFeedback} from "react-native";
import {COLOR} from "../utils/Config";


class StatisticsItem extends PureComponent {
    constructor(props) {
        super(props);

        this.value = props.value;
        this.title = props.title;
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemValue}>{this.value}</Text>
                <Text style={styles.itemTitle}>{this.title}</Text>
            </View>
        );
    }
}


export default class StatisticsScreen extends PureComponent {

    static navigationOptions = ({navigation, screenProps}) => ({
        // title: "统计",
        // headerRight: <Button title="添加" onPress={() => {
        //     console.log('add :' + JSON.stringify(navigation));
        //     navigation.navigate('CreateTask')
        // }}/>,
    });

    constructor(props) {
        super(props);

        this.totalStatisticsData = {
            title: '累计完成统计',
            time: {
                value: '7.1h',
                title: '总专注时间',
            },
            tomatoCount: {
                value: '7.1h',
                title: '总专注时间',
            },
            taskCount: {
                value: '7.1h',
                title: '总专注时间',
            },
        };
        this.todayStatisticsData = {
            title: '今日完成统计',
            targetTomatoCount: {
                value: '7.2h',
                title: '目标番茄数',
            },
            tomatoCount: {
                value: '7.3h',
                title: '今日番茄数',
            },
            taskCount: {
                value: '7.4h',
                title: '今日任务数',
            },
        };
        this.everydayStatisticsData = {
            title: '每日完成的番茄数',
            items: [
                {id: '0', title: "item2", tomatoCount: 2,},
                {id: '1', title: "item3", tomatoCount: 3,},
                {id: '2', title: "item3", tomatoCount: 4,},
                {id: '3', title: "item3", tomatoCount: 5,},
                {id: '4', title: "item3", tomatoCount: 6,},
                {id: '5', title: "item3", tomatoCount: 7,},
                {id: '6', title: "item3", tomatoCount: 8,},
                {id: '7', title: "item3", tomatoCount: 9,},
                {id: '8', title: "item3", tomatoCount: 10,},
                {id: '9', title: "item3", tomatoCount: 9,},
                {id: '10', title: "item3", tomatoCount: 8,},
                {id: '11', title: "item3", tomatoCount: 7,},
                {id: '12', title: "item1", tomatoCount: 1,},
                {id: '13', title: "item3", tomatoCount: 6,},
                {id: '14', title: "item3", tomatoCount: 5,},
                {id: '15', title: "item3", tomatoCount: 4,},
                {id: '16', title: "item3", tomatoCount: 3,},
                {id: '17', title: "item3", tomatoCount: 2,},
                {id: '18', title: "item3", tomatoCount: 1,},
                {id: '19', title: "item3", tomatoCount: 0,},
                {id: '20', title: "item3", tomatoCount: 1,},
                {id: '21', title: "item3", tomatoCount: 2,},
                {id: '22', title: "item3", tomatoCount: 3,},
                {id: '23', title: "item3", tomatoCount: 4,},
                {id: '24', title: "item3", tomatoCount: 5,},
                {id: '25', title: "item3", tomatoCount: 6,},
                {id: '26', title: "item3", tomatoCount: 7,},
                {id: '27', title: "item3", tomatoCount: 8,},
                {id: '28', title: "item3", tomatoCount: 9,},
                {id: '29', title: "item3", tomatoCount: 10,},
                {id: '30', title: "item3", tomatoCount: 0,},
            ],
        };

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
            <View style={styles.container}>
                <View style={styles.moduleContainer}>
                    <Text style={styles.moduleTitle}>{this.totalStatisticsData.title}</Text>
                    <View style={styles.itemContainerView}>
                        <StatisticsItem title={this.totalStatisticsData.time.title}
                                        value={this.totalStatisticsData.time.value}/>
                        <StatisticsItem title={this.totalStatisticsData.tomatoCount.title}
                                        value={this.totalStatisticsData.tomatoCount.value}/>
                        <StatisticsItem title={this.totalStatisticsData.taskCount.title}
                                        value={this.totalStatisticsData.taskCount.value}/>
                    </View>
                </View>

                <View style={styles.moduleContainer}>
                    <Text style={styles.moduleTitle}>{this.todayStatisticsData.title}</Text>
                    <View style={styles.itemContainerView}>
                        <StatisticsItem title={this.todayStatisticsData.targetTomatoCount.title}
                                        value={this.todayStatisticsData.targetTomatoCount.value}/>
                        <StatisticsItem title={this.todayStatisticsData.tomatoCount.title}
                                        value={this.todayStatisticsData.tomatoCount.value}/>
                        <StatisticsItem title={this.todayStatisticsData.taskCount.title}
                                        value={this.todayStatisticsData.taskCount.value}/>
                    </View>
                </View>

                <View style={[styles.moduleContainer]}>
                    <Text style={styles.moduleTitle}>{this.everydayStatisticsData.title}</Text>
                    <Text style={styles.moduleTitle}>{}</Text>
                    <DailyTomatoCountList data={this.everydayStatisticsData.items}/>
                </View>
            </View>
        );
    }
}

class DailyTomatoCountListItem extends React.PureComponent {

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={{
                    flexDirection: 'column',
                    width: 30,
                    height: 200,
                    marginLeft: 1,
                    marginRight: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}>
                    <View style={{
                        backgroundColor: this.props.selected ? COLOR.primary : COLOR.secondary,
                        borderRadius: 5,
                        width: 10,
                        height: 10 + 150 * this.props.value / 10
                    }}/>
                    <Text style={{
                        width: 30,
                        fontSize: 10,
                        marginTop: 5,
                        marginBottom: 10,
                        textAlign: 'center'
                    }}>12-10</Text>
                    {/*<Text style={{backgroundColor: '#f00', width: 30, height: 40}}>{this.props.title}</Text>*/}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

class DailyTomatoCountList extends React.PureComponent {
    state = {selected: {}};

    _keyExtractor = (item, index) => index;

    _onPressItem = (id: string) => {
        this.setState((state) => {
            // let selected = {...state.selected};
            let selected = {};
            selected[id] = !selected[id];
            return {selected};
        });
    };

    _renderItem = ({item}) => (
        <DailyTomatoCountListItem
            id={item.id}
            onPress={() => this._onPressItem(item.id)}
            selected={!!this.state.selected[item.id]}
            title={item.title}
            value={item.tomatoCount}
        />
    );

    render() {
        return (
            <FlatList
                horizontal={true}
                data={this.props.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ItemSeparatorComponent={() => ( <View style={styles.listSeparator}/> )}
                // ItemSeparatorComponent={({highlighted}) => ( <View style={[style.separator, highlighted && {marginLeft: 0}]} /> )}
            />
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    moduleContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    moduleTitle: {
        marginTop: 5,
        color: COLOR.textEmphasis,
    },
    itemContainerView: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
    },
    itemValue: {
        color: COLOR.primary,
        fontSize: 32,
    },
    itemTitle: {
        color: COLOR.textPrompt,
        fontSize: 12,
    },
    listItem: {
        backgroundColor: COLOR.primary,
        width: 12,
        height: 200,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 50,
        borderRadius: 6,
    },
    listSeparator: {
        // width:10,
        // height:10,
    }

});