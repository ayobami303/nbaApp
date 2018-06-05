"use strict";

import React from "react";
import formatDuration from "./formatDuration";
import formatTime from "./formatTime";
import { connect } from "react-redux";
import moment from "moment-timezone";
// import type { Session } from "../../reducers/sessions";

import AppColors from "../../common/AppColors";
import AppFonts from "../../common/AppFonts";
import { Text } from "../../common/AppText";
import TimelineSegment from "../../common/TimelineSegment";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";

/* Constants
============================================================================= */

const CELL_PADDING_TOP = 8,
    CELL_PADDING_RIGHT = 20,
    CELL_PADDING_BOTTOM = 12,
    DURATION_FONT_SIZE = 14,
    CELL_LEFT = 20,
    TIMELINE_LEFT = CELL_LEFT - 18,
    TIMELINE_DOT_TOP = CELL_PADDING_TOP + 7;


// const sessions = [{ title: "Registration", day: 1, startTime: '2018-06-05 06:00', endTime: '2018-06-05 16:00', location: 'REGISTRATION' }, { title: "Opening Speech", day: 1, startTime: '2018-06-05 07:00', endTime: '2018-06-05 07:30', location: '220A' }, { title: "this is it", day: 1, startTime: '2018-06-05 08:00', endTime: '2018-06-05 10:30', location: '220B', hasDetails: true }, { title: "Lunch", day: 1, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' }];
/* =============================================================================
<SessionCell />
============================================================================= */

class SessionCell extends React.Component {
    // props: {
    //     session: sessions,
    //     isFavorite: boolean,
    //     showStartEndTime: boolean,
    //     onPress: ?() => void,
    //     style: any
    // };

    static defaultProps = {
        // session: sessions,
        firstRow: false,
        embedded: false
    };

    render() {
        const { embedded, isFavorite } = this.props;
        const embeddedStyles = embedded ? styles.cellEmbedded : null;

        return (
            <View style={[styles.cell, embeddedStyles, this.props.style]}>
                {/* {!embedded ? this.renderTimeline() : null} */}
                {this.renderContent()}
                {isFavorite ? this.renderFavoritesIcon() : null}
            </View>
        );
    }

    renderTimeline() {
        const { firstRow } = this.props;
        // alert(firstRow);
        if (firstRow) {
            return (
                <TimelineSegment
                    left={TIMELINE_LEFT}
                    lineOffsetTop={TIMELINE_DOT_TOP + 2}
                    dotOffsetTop={TIMELINE_DOT_TOP}
                />
            );
        } else {
            return (
                <TimelineSegment
                    left={TIMELINE_LEFT}
                    dotOffsetTop={TIMELINE_DOT_TOP}
                />
            );
        }
    }

    renderContent() {
        if (this.props.onPress) {
            return (
                <TouchableOpacity activeOpacity={0.75} onPress={this.props.onPress}>
                    {this.renderTitle()}
                    {this.renderMeta()}
                </TouchableOpacity>
            );
        } else {
            return [this.renderTitle(), this.renderMeta()];
        }
    }

    renderTitle() {
        const { session } = this.props;
        const embedded = this.props.embedded ? styles.titleEmbedded : null;
        return (
            <View key={`${session.id}_title`} style={styles.titleSection}>
                <Text numberOfLines={3} style={[styles.titleText, embedded]}>
                    {session.title}
                </Text>
            </View>
        );
    }

    renderMeta() {
        const { session } = this.props;
        
        return (
            <Text
                key={`${session.id}_meta`}
                numberOfLines={1}
                style={styles.duration}
            >
                <Text style={{ color: AppColors.colorForLocation(session.location) }}>
                    {session.location.toUpperCase()}
                </Text>
                {" - "}
                {this.getFormattedTime()}
            </Text>
        );
    }

    renderFavoritesIcon() {
        const { title } = this.props.session;
        let iconSource = require("./img/added.png");
        if (title && title.toLowerCase().indexOf("react") > -1) {
            iconSource = require("./img/added-react.png");
        }
        return (
            <View style={styles.added}>
                <Image style={{ tintColor: AppColors.pink }} source={iconSource} />
            </View>
        );
    }

    getFormattedTime() {
        const { startTime, endTime } = this.props.session;
        const startTimeN = moment.utc(startTime);
        const endTimeN = moment.utc(endTime);
        if (this.props.showStartEndTime) {
            return formatTime(startTimeN, true) + "-" + formatTime(endTimeN);
        } else {
            // alert(formatDuration(startTimeN, endTimeN));
            return formatDuration(startTimeN, endTimeN);
        }
    }
}

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
    cell: {
        paddingTop: CELL_PADDING_TOP,
        paddingBottom: CELL_PADDING_BOTTOM,
        paddingLeft: CELL_LEFT,
        paddingRight: CELL_PADDING_RIGHT,
        // backgroundColor: AppColors.background,
        justifyContent: "center"
    },
    cellEmbedded: {
        paddingLeft: CELL_PADDING_RIGHT
    },
    titleSection: {
        paddingRight: 9,
        flexDirection: "row",
        alignItems: "center"
    },
    titleAndDuration: {
        justifyContent: "center"
    },
    titleText: {
        flex: 1,
        fontSize: AppFonts.normalize(17),
        lineHeight: 22,
        color: AppColors.color2,
        marginBottom: 3,
        marginRight: 10
    },
    titleEmbedded: {
        fontFamily: AppFonts.fontWithWeight("helvetica", "semibold")
    },
    duration: {
        fontSize: DURATION_FONT_SIZE,
        color: AppColors.colorWithAlpha("tangaroa", 0.6)
    },
    added: {
        position: "absolute",
        backgroundColor: AppColors.yellow,
        alignItems: "center",
        justifyContent: "center",
        width: 23,
        height: 21,
        right: 0,
        top: CELL_PADDING_TOP
    }
});

/* Redux
============================================================================= */
// function select(store, props) {
//     return {
//         isFavorite: !!store.schedule[props.session.id]
//     };
// }

/* Export
============================================================================= */
// module.exports = connect(select)(SessionCell);
export default SessionCell;

