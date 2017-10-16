/**
 *  作者：冯夷夷
 *  功能：
 */

import React, {PureComponent} from 'react';
import {SectionList, Text, View} from "react-native";
import {Header, TabNavigator} from "react-navigation";


class TaskListItem extends PureComponent {
    constructor(props) {
        super(props);

        this.title = props.title || "default-title";
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>{this.title} + 000</Text>
            </View>
        );
    }
}

class TaskListItemHeader extends PureComponent {
    constructor(props) {
        super(props);

        this.title = props.title || "default-title";
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f00'}}>
                <Text>header: {this.title}</Text>
            </View>
        );
    }
}

class TaskList extends PureComponent {

    constructor(props) {
        super(props);
        this.items = [
            {
                data: [
                    {title: 'data-title-11',},
                    {title: 'data-title-12',},
                    {title: 'data-title-13',},
                    {title: 'data-title-11',},
                    {title: 'data-title-12',},
                    {title: 'data-title-13',},
                    {title: 'data-title-11',},
                    {title: 'data-title-12',},
                    {title: 'data-title-13',},
                    {title: 'data-title-11',},
                    {title: 'data-title-12',},
                    {title: 'data-title-13',},
                    {title: 'data-title-11',},
                    {title: 'data-title-12',},
                    {title: 'data-title-13',},
                    {title: 'data-title-11',},
                    {title: 'data-title-12',},
                    {title: 'data-title-13',},
                    {title: 'data-title-11',},
                    {title: 'data-title-12',},
                    {title: 'data-title-13',},
                    {title: 'data-title-11',},
                    {title: 'data-title-12',},
                    {title: 'data-title-13',},
                ],
                sectionTitle: "section-title-11111",
            },
            {
                data: [
                    {title: 'data-title-21', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-22', },
                    {title: 'data-title-23', },
                ],
                sectionTitle: "section-title-22222",
            },
            {
                data: [
                    {title: 'data-title-31', },
                    {title: 'data-title-32', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                    {title: 'data-title-33', },
                ],
                sectionTitle: "section-title-33333",
            },
        ];
        this.items2 = [
            {
                data: [
                    {title: 'data-title-31', key: 'data-key-31',},
                    {title: 'data-title-32', key: 'data-key-32',},
                    {title: 'data-title-33', key: 'data-key-33',},
                ],
                sectionTitle: "section-title-33333",
                renderItem: ({item}) => <TaskListItem title={item.title}/>,
            },
            {
                data: [
                    {title: 'data-title-21', key: 'data-key-21',},
                    {title: 'data-title-22', key: 'data-key-22',},
                    {title: 'data-title-23', key: 'data-key-23',},
                ],
                sectionTitle: "section-title-22222",
                renderItem: ({item}) => <TaskListItem title={item.title}/>,
            },
            {
                data: [
                    {title: 'data-title-11', key: 'data-key-11',},
                    {title: 'data-title-12', key: 'data-key-12',},
                    {title: 'data-title-13', key: 'data-key-13',},
                ],
                sectionTitle: "section-title-11111",
                renderItem: ({item}) => <TaskListItem title={item.title}/>,
            },
        ]
    }

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View style={{flex: 1}}>
                {/*如果你每个组都复用一个子组件那就按照这个的结构*/}
                <SectionList renderItem={({item}) => <TaskListItem title={item.title}/>}
                             renderSectionHeader={({section}) => <TaskListItemHeader title={section.sectionTitle}/>}
                             sections={this.items}
                             keyExtractor={this._keyExtractor}
                />

                {/* 如果你想要不同的组返回不同样式的子组件那就按照这个的结构返回不同的renderItem即可*/}
                {/*<SectionList sections={this.items2}*/}
                             {/*renderSectionHeader={({section}) => <TaskListItemHeader title={section.sectionTitle}/>}*/}
                {/*/>*/}
            </View>
        );
    }
}

export default class TaskScreen extends PureComponent {

    render() {
        return (
            <TasksTab/>
        );
    }
}


const TasksTab = TabNavigator(
    {
        todayTask: {
            screen: TaskList,
        },
        willTask: {
            screen: TaskList,
        },
        didTask: {
            screen: TaskList,
        },
        unDoneTask: {
            screen: TaskList,
        },
    },
    {
        tabBarPosition: 'top',
        animationEnabled: true,
        swipeEnabled: true,
    }
);


