"use strict";

import moment from "moment-timezone";
import React from "react";
import { View, StyleSheet } from "react-native";
import AppColors from "../../common/AppColors";

/* constants ================================================================ */
const NOW_MARKER_DOT = 6,
  NOW_MARKER_LINE = 1,
  LABELS_HEIGHT = 22;

/* =============================================================================
<F8GanttNowMarker />
============================================================================= */

export default class GanttNowMarker extends React.Component {
  render() {
    const { nowTime, startTime, endTime, containerWidth } = this.props;

    const mNow = moment.utc(nowTime),
      mDayStart = moment.utc(startTime),
      mDayEnd = moment.utc(endTime);

    const minutesTotalDayLength = mDayEnd.diff(mDayStart, "minutes"),
      minutesSinceStartOfDay = mNow.diff(mDayStart, "minutes");

    const pos =
      containerWidth / minutesTotalDayLength * minutesSinceStartOfDay -
      NOW_MARKER_DOT / 2;

    return (
      <View style={[styles.container, { left: pos }]}>
        <View style={styles.line} />
        <View style={styles.dot} />
      </View>
    );
  }
}

/* Styles
============================================================================= */
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: LABELS_HEIGHT,
    width: NOW_MARKER_DOT,
    backgroundColor: "transparent"
  },
  line: {
    position: "absolute",
    width: NOW_MARKER_LINE,
    left: NOW_MARKER_DOT / 2 - NOW_MARKER_LINE / 2,
    top: 0,
    bottom: NOW_MARKER_DOT / 2,
    backgroundColor: AppColors.white
  },
  dot: {
    position: "absolute",
    width: NOW_MARKER_DOT,
    height: NOW_MARKER_DOT,
    borderRadius: NOW_MARKER_DOT / 2,
    bottom: 0,
    left: 0,
    backgroundColor: AppColors.white
  }
});
