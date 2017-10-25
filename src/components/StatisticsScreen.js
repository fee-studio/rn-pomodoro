/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {Component, PureComponent} from 'react';
import {Text, View, StyleSheet, FlatList} from "react-native";


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
        title: "统计",
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
            title: '今日完成统计',
            items: [
                {title: "item1"},
                {title: "item2"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
                {title: "item3"},
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
                <View style={styles.moduleContainer}>
                    <MyList data={this.everydayStatisticsData.items}/>
                </View>
            </View>
        );
    }
}

class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            /*
            <Text
                {...this.props}
                onPress={this._onPress}
            >{this.props.title}</Text>
            */


            <View style={styles.listItem}/>
        )
    }
}

class MyList extends React.PureComponent {
    state = {selected: (new Map(): Map<string, boolean>)};

    _keyExtractor = (item, index) => index;

    _onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
        });
    };

    _renderItem = ({item}) => (
        <MyListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            title={item.title}
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
        color: '#f66',
        fontSize: 30,
    },
    itemTitle: {
        color: '#666',
    },
    listItem: {
        backgroundColor: '#f00',
        width: 20,
        height: 100,
        marginLeft: 5,
        marginRight: 5,
    },
    listSeparator: {
        // width:10,
        // height:10,
    }


    // itemContentView: {
    //     marginRight: 10,
    //     justifyContent: 'center',
    //     backgroundColor: '#0ff',
    // },
    // itemTitleView: {
    //     marginLeft: 10,
    //     justifyContent: 'center',
    //     backgroundColor: '#ff0',
    // },
    // itemArrowRightView: {
    //     marginRight: 10,
    //     justifyContent: 'center',
    //     backgroundColor: '#09f',
    // },
    // itemArrowRight: {
    //     backgroundColor: '#193',
    //     width: 20,
    //     height: 20,
    // },
    // itemContentRight: {
    //     flexDirection: 'row',
    //     marginRight: 10,
    // },
    // itemOnOff: {
    //     marginRight: 10,
    //     backgroundColor: '#f0f',
    // },
    // itemContent: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#0f0',
    //     marginRight: 10,
    //     color: '#666'
    // },

});