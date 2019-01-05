/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {Component, PureComponent} from 'react'
import {Text, View, StyleSheet, FlatList, TouchableHighlight, TouchableWithoutFeedback, ScrollView} from "react-native"
import {COLOR} from "../../utils/Config"
import {Tomato} from "../../database/RealmDB"
import TomatoService from "../../database/TomatoService"
import TaskService from "../../database/TaskService"
import GlobalData from "../../utils/GlobalData"
import {connect} from "react-redux"
import Utils from "../../utils/Utils";


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
                        height: 10 + 160 * Math.min(this.props.value, 10) / 10
                    }}/>
                    <Text style={{
                        width: 30,
                        fontSize: 10,
                        marginTop: 5,
                        marginBottom: 10,
                        textAlign: 'center'
                    }}>{this.props.title}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

class DailyTomatoCountList extends React.PureComponent {
    state = {selected: {}, selectedValue: ''}

    _keyExtractor = (item, index) => item.id

    _onPressItem = (item) => {
        this.setState((state) => {
            // let selected = {...state.selected};
            let selected = {}
            selected[item.id] = !selected[item.id]

            let selectedValue = item.tomatoCount

            return {selected, selectedValue}
        })
    }

    _renderItem = ({item}) => (
        <DailyTomatoCountListItem
            id={item.id}
            onPress={() => this._onPressItem(item)}
            selected={!!this.state.selected[item.id]}
            title={item.title}
            value={item.tomatoCount}
        />
    )

    render() {
        return (
            <View style={{height: 30+200}}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 30,
                    color: COLOR.primary,
                    height: 30
                }}>{this.state.selectedValue}</Text>
                <FlatList
                    horizontal={true}
                    data={this.props.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={() => (<View style={styles.listSeparator}/>)}
                    ref="_flatList"
                    // ref={(fl) => this._flatList = fl}
                    // getItemLayout={(data, index) => (
                    //     {length: 30, offset: 30 * index, index}
                    // )}
                    // ItemSeparatorComponent={({highlighted}) => ( <View style={[style.separator, highlighted && {marginLeft: 0}]} /> )}
                 />
            </View>
        )
    }

    componentDidMount() {
        // this._flatList.scrollToEnd();
        // this._flatList.scrollToEnd({animated: true});
        // this.refs._flatList.scrollToEnd();

        // 必须要加setTimeout, 应该是 react-native自己的问题
        setTimeout(() => {
            this.refs._flatList.scrollToEnd({animated: true})
        }, 100)
    }
}

class StatisticsItem extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemValue}>{this.props.value}</Text>
                <Text style={styles.itemTitle}>{this.props.title}</Text>
            </View>
        )
    }
}

class StatisticsScreen extends PureComponent {

    static navigationOptions = ({navigation, screenProps}) => ({
        // title: "统计",
        // headerRight: <Button title="添加" onPress={() => {
        //     console.log('add :' + JSON.stringify(navigation));
        //     navigation.navigate('CreateTask')
        // }}/>,
    })

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.moduleContainer}>
                    <Text style={styles.moduleTitle}>{this.props.totalStatisticsData.title}</Text>
                    <View style={styles.itemContainerView}>
                        <StatisticsItem title={this.props.totalStatisticsData.time.title}
                                        value={this.props.totalStatisticsData.time.value}/>
                        <StatisticsItem title={this.props.totalStatisticsData.tomatoCount.title}
                                        value={this.props.totalStatisticsData.tomatoCount.value}/>
                        <StatisticsItem title={this.props.totalStatisticsData.taskCount.title}
                                        value={this.props.totalStatisticsData.taskCount.value}/>
                    </View>
                </View>

                <View style={styles.moduleContainer}>
                    <Text style={styles.moduleTitle}>{this.props.todayStatisticsData.title}</Text>
                    <View style={styles.itemContainerView}>
                        <StatisticsItem title={this.props.todayStatisticsData.targetTomatoCount.title}
                                        value={this.props.todayStatisticsData.targetTomatoCount.value}/>
                        <StatisticsItem title={this.props.todayStatisticsData.tomatoCount.title}
                                        value={this.props.todayStatisticsData.tomatoCount.value}/>
                        <StatisticsItem title={this.props.todayStatisticsData.taskCount.title}
                                        value={this.props.todayStatisticsData.taskCount.value}/>
                    </View>
                </View>

                <View style={[styles.moduleContainer,]}>
                    <Text style={styles.moduleTitle}>{this.props.everydayStatisticsData.title}</Text>
                    <DailyTomatoCountList style={{backgroundColor: '#0f0'}}
                                          data={this.props.everydayStatisticsData.items}/>
                </View>
                {/*<View style={[styles.moduleContainer, {height:250}]}>*/}
                    {/*<Text style={styles.moduleTitle}>{this.props.everydayStatisticsData.title}</Text>*/}
                    {/*<DailyTomatoCountList style={{backgroundColor: '#0f0'}}*/}
                                          {/*data={this.props.everydayStatisticsData.items}/>*/}
                {/*</View>*/}
            </ScrollView>
        )
    }

    componentDidMount() {

    }

}

const mapStateToProps = (state, ownProps) => {
    // todo 写这里会刷新好多次, 完了优化
    let props = {
        totalStatisticsData: {
            title: '累计完成统计',
            time: {
                value: TomatoService.didFinishTotalTime(),
                title: '总专注时间',
            },
            tomatoCount: {
                value: TomatoService.didFinishTotalCount(),
                title: '总番茄数',
            },
            taskCount: {
                value: TaskService.didFinishTotalCount(),
                title: '总任务数',
            },
        },
        todayStatisticsData: {
            title: '今日完成统计',
            targetTomatoCount: {
                value: GlobalData.tomatoConfig.dailyTargetCount,
                title: '目标番茄数',
            },
            tomatoCount: {
                value: TomatoService.didFinishTodayCount(),
                title: '今日番茄数',
            },
            taskCount: {
                value: TaskService.didFinishTodayCount(),
                title: '今日任务数',
            },
        },
        everydayStatisticsData: {
            title: '每日完成的番茄数',
            items: TomatoService.arrInMonthDidFinishCount(),
        }
    }

    return props
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Utils.getHeaderInset(),
    },
    moduleContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    moduleTitle: {
        marginTop: 15,
        marginBottom: 5,
        color: COLOR.textNormal,
        fontWeight: 'bold',
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

})