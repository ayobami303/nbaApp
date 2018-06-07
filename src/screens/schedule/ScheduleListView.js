"use strict";

import ListView from "ListView";
import Platform from "Platform";
import React from "react";
import { Text, View} from "react-native";
import { navigator } from "react-native-navigation";
import { connect } from 'react-redux'

import SessionCell from "./SessionCell";
import SessionHeader from "./SessionHeader";

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === "android" ? 20 : 10;

let dataSource = new ListView.DataSource({
    getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
    getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
    rowHasChanged: (row1, row2) => row1 !== row2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

class ScheduleListView extends React.Component {

    static defaultProps = {
        data: [],
        contentInset: { top: 0, bottom: 0 },
        // TODO: This has to be scrollview height + fake header
        minContentHeight: 0
        // renderSeparator: (sectionID, rowID) => <View style={styles.separator} key={rowID} />,
    };

    constructor(props: Props) {
        super(props);

        this.state = {            
            contentHeight: 0,
            containerHeight: 0,
            dataSource: this.convertSessionArrayToMap(dataSource,props.data)
            // dataSource: dataSource.cloneWithRowsAndSections(this.convertSessionArrayToMap(todaySessions))
        };

        (this: any).renderFooter = this.renderFooter.bind(this);
        (this: any).renderHeader = this.renderHeader.bind(this);
        (this: any).onContentSizeChange = this.onContentSizeChange.bind(this);
    }

    componentWillMount(){

    }

    convertSessionArrayToMap(dataSource, data) {        
        if (!data) {
            return dataSource.cloneWithRows([]);
        }
        if (Array.isArray(data)) {
            return dataSource.cloneWithRows(data);
        }
        return dataSource.cloneWithRowsAndSections(data);

    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.data !== nextProps.data) {
            this.setState({                
                dataSource: this.convertSessionArrayToMap(dataSource, nextProps.data)
                // dataSource: this.state.dataSource.cloneWithRowsAndSections(this.convertSessionArrayToMap(todaySessions))
            });
        }
    }

    render() {
        const { contentInset } = this.props;
        const bottom =
            contentInset.bottom +
            Math.max(0, this.props.minContentHeight - this.state.contentHeight);
        return (
            <ListView
                initialListSize={10}
                pageSize={LIST_VIEW_PAGE_SIZE}
                enableEmptySections={true}
                removeClippedSubviews={false}
                renderRow={this.renderRow.bind(this)}
                // renderRow={rowData => <SessionCell session ={rowData} firstRow = {this.isFirstSessionCell.bind(this,rowData.id)} />}
                ref={c => (this._listview = c)}
                dataSource={this.state.dataSource}
                renderSectionHeader={this.renderSectionHeader.bind(this)}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={{ height: 1, backgroundColor: '#E0E0E0'}} />}
                renderFooter={this.renderFooter}
                contentInset={{ bottom, top: contentInset.top }}
                onContentSizeChange={this.onContentSizeChange}
                onLayout={event => {
                    const { height } = event.nativeEvent.layout;
                    if (this.state.containerHeight !== height) {
                        this.setState({ containerHeight: height });
                    }
                }}
            />
        );
    }

    renderRow(session: Session, day: 1) {
        // alert(JSON.stringify(session))
        return (
            <SessionCell
                onPress={_ => this.openSession(session, day)}
                session={session}
                firstRow={this.isFirstSessionCell(session.id)}
            />
        );
    }

    renderSectionHeader(sectionData, startTime){
        return (<SessionHeader title = {startTime}/>);
    }

    openSession(session: Session, day: number) {
        // alert(JSON.stringify(session))
        
        this.props.navigator.push({
            screen:'nbaApp.ScheduleDetail',
            passProps:{
                day,
                session
            }            
        });
    }


    isFirstSessionCell(id) {
        // alert(JSON.stringify(this.state.todaySessions))
        // const keys = Object.keys(this.state.todaySessions);
        // const innerKeys = Object.keys(this.state.todaySessions[keys[0]]);
        // return id === innerKeys[0];
    }

    onContentSizeChange(contentWidth: number, contentHeight: number) {
        if (contentHeight !== this.state.contentHeight) {
            this.setState({ contentHeight });
        }
    }

    scrollTo(...args: Array<any>) {
        this._listview.scrollTo(...args);
    }

    getScrollResponder(): any {
        return this._listview.getScrollResponder();
    }

    renderHeader(): ?ReactElement {
        if (this.state.dataSource.getRowCount() !== 0) {
            return this.props.renderHeader && this.props.renderHeader();
        }
    }

    renderFooter(): ?ReactElement {
        if (this.state.dataSource.getRowCount() === 0) {
            return (
                this.props.renderEmptyList &&
                this.props.renderEmptyList(this.state.containerHeight)
            );
        }

        return this.props.renderFooter && this.props.renderFooter();
    }
}

function cloneWithData(dataSource: ListView.DataSource, data: ?Data) {
    if (!data) {
        return dataSource.cloneWithRows([]);
    }
    if (Array.isArray(data)) {
        return dataSource.cloneWithRows(data);
    }
    return dataSource.cloneWithRowsAndSections(data);
}

module.exports = ScheduleListView;

