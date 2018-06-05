"use strict";

import moment from "moment-timezone";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../common/AppText";
import { timezone } from "../../env.js";
import AppColors from "../../common/AppColors";

/* constants ================================================================ */
const LABELS_WIDTH = 30,
  LABELS_HEIGHT = 22;

/* =============================================================================
<F8GanttGrid />
============================================================================= */

export default class GanttGrid extends React.Component {
  render() {
    const ms = moment.tz(this.props.startTime, timezone),
      me = moment.tz(this.props.endTime, timezone);
    const diff = me.diff(ms, "hours");
    const cols = this.renderColumns(ms, diff);
    return (
      <View style={[styles.gridContainer, { height: this.props.height }]}>
        {cols}
      </View>
    );
  }

  renderColumns(momentStart: moment, count: number) {
    let cols = [];
    let previousLabelAMPM = null;
    for (let i = 0; i < count + 1; i++) {
      const left = this.props.containerWidth / count * i - LABELS_WIDTH / 2;
      let label = null;
      if (i % 2 === 0) {
        let labelText = momentStart.add(i, "h").format("h");
        let ampm = momentStart
          .format("A")
          .split("M")
          .join("");
        if (previousLabelAMPM && ampm !== previousLabelAMPM) {
          labelText += momentStart
            .format("A")
            .split("M")
            .join("");
        }
        // if(ampm !== previousLabelAMPM) labelText += (momentStart.format('A')).split('M').join('');
        previousLabelAMPM = momentStart
          .format("A")
          .split("M")
          .join("");
        label = <Text style={styles.gridColumnLabel}>{labelText}</Text>;
        momentStart.subtract(i, "h");
      }
      cols.push(
        <View key={i} style={[styles.gridColumn, { left }]}>
          <View style={styles.gridLine} />
          {label}
        </View>
      );
    }
    return cols;
  }
}

/* Styles
============================================================================= */
const styles = StyleSheet.create({
  gridContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  gridColumn: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: LABELS_WIDTH,
    backgroundColor: "transparent" //'#2d3132',
    // alignItems: 'center',
  },
  gridLine: {
    position: "absolute",
    left: LABELS_WIDTH / 2,
    top: 0,
    bottom: LABELS_HEIGHT,
    width: 1,
    backgroundColor: AppColors.color1
  },
  gridColumnLabel: {
    position: "absolute",
    paddingTop: 6,
    left: 0,
    right: 0,
    height: LABELS_HEIGHT,
    bottom: 0, //-LABELS_HEIGHT,
    textAlign: "center",
    fontSize: 10,
    color: AppColors.color1,
    // color: "rgba(95, 118, 162, 1)",
    backgroundColor: "transparent"
  }
});
