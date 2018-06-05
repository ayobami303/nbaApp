"use strict";

import moment from "moment-timezone";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "../../common/AppText";
import AppColors from "../../common/AppColors";

/* constants ================================================================ */

const ROW_HEIGHT = 26;

/* =============================================================================
<F8GanttRow />
============================================================================= */

export default class GanttRow extends React.Component {
  calculateSize() {
    const {
      sessionStart,
      sessionEnd,
      dayStart,
      dayEnd,
      containerWidth
    } = this.props;

    const mSessionStart = moment.utc(sessionStart),
      mSessionEnd = moment.utc(sessionEnd),
      mDayStart = moment.utc(dayStart),
      mDayEnd = moment.utc(dayEnd);

    const sessionLength = mSessionEnd.diff(mSessionStart, "minutes"),
      dayLength = mDayEnd.diff(mDayStart, "minutes"),
      daySessionStartDiff = mSessionStart.diff(mDayStart, "minutes");

    return {
      left: daySessionStartDiff / dayLength * containerWidth,
      width: sessionLength / dayLength * containerWidth
    };
  }

  render() {
    const { location, title, offset } = this.props;
    const { left, width } = this.calculateSize();
    let tintColor = location
      ? AppColors.colorForLocation(location.toUpperCase())
      : AppColors.blue;
      // alert(tintColor);
    if (location.toUpperCase().indexOf("REGISTRATION") > -1) {
      tintColor = AppColors.yellow;
    }

    return (
      <View style={[styles.container, { top: offset, marginLeft: left - 2.5 }]}>
        <Text numberOfLines={1} style={styles.label}>
          {title}
        </Text>
        <View style={[styles.barContainer, { width: width + 6 }]}>
          <View style={[styles.bar, { width: width, backgroundColor: tintColor }]} />         
        </View>
      </View>
    );
  }
}

/* StyleSheet =============================================================== */
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    height: ROW_HEIGHT,
    backgroundColor: "transparent"
  },
  label: {
    paddingLeft: 2,
    fontSize: 13,
    letterSpacing: -0.1,
    color: AppColors.white
  },
  barContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 14
  },
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 4.5,
    height: 9,
    overflow: "hidden",
    borderRadius: 2
    // backgroundColor: AppColors.colorWithAlpha("iceberg", 0.6)
  },
  barStartIcon: {
    position: "absolute",
    left: 0,
    bottom: 0
  },
  barEndIcon: {
    position: "absolute",
    right: 9,
    bottom: 0
  },
  barColorIcon: {
    position: "absolute",
    right: 0,
    bottom: 0
  }
});
