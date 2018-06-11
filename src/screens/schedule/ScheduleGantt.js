"use strict";

import moment from "moment-timezone";
import React from "react";
import { View, StyleSheet } from "react-native";

import GanttGrid from "./GanttGrid";
import GanttNowMarker from "./GanttNowMarker";
import GanttRow from "./GanttRow";

/* constants ================================================================ */
const ROW_HEIGHT = 26,
  ROW_GUTTERS = 10,
  GRID_PADDING = 10,
  LABELS_HEIGHT = 22;

/* =============================================================================
<F8ScheduleGantt />
--------------------------------------------------------------------------------
Props:
  ! sessions:array
  ! now:number
============================================================================= */

export default class F8ScheduleGantt extends React.Component {
  constructor(props) {
    super(props);

    const { filtered, earliest, latest } = this.filterSessions(props.sessions);
    this.state = {
      now: props.now,
      filteredSessions: filtered,
      dayStart: earliest,
      dayEnd: latest
    };
    
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};
    // alert(JSON.stringify(nextProps.sessions))
    if (nextProps.now !== this.props.now) {
      newState.now = nextProps.now;
    }
    if (nextProps.sessions !== this.props.sessions) {
      const { filtered, earliest, latest } = this.filterSessions(
        nextProps.sessions
      );
      newState.filteredSessions = filtered;
      newState.dayStart = earliest;
      newState.dayEnd = latest;
    }
    if (Object.keys(newState).length) {
      this.setState({ ...newState });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  filterSessions(all) {
    let grouped = this.groupSessionsIntoRows(all);
    let filtered = [];
    let earliest = null,
      latest = null;

    (Object.keys(grouped) || []).map(title => {
      let session = { title, start_time: null, end_time: null, times: [] };
      (grouped[title] || []).map(each => {
        // find the earliest and latest start/end times
        if (!earliest || each.start_time < earliest) {
          earliest = each.start_time;
        }
        if (!latest || each.end_time > latest) {
          latest = each.end_time;
        }
        // update grouped session start/end times (if necessary)
        if (!session.start_time || each.start_time < session.start_time) {
          session.start_time = each.start_time;
        }
        if (!session.end_time || each.end_time > session.end_time) {
          session.end_time = each.end_time;
        }
        // pass through multiple times, deprecated
        if (title !== "Sessions" && each.times && each.times.length) {
          session.times = [...session.times, ...each.times];
        }
        // set the location (if necessary)
        if (!session.location) {
          session.location = each.location;
        }
      });
      filtered.push(session);
    });

    const roundedDownStart = moment
        .utc(earliest)
        .startOf("hour")
        .valueOf(),
      endMoment = moment.utc(latest),
      roundedUpEnd =
        endMoment.minute() || endMoment.second() || endMoment.millisecond()
          ? endMoment.add(1, "hour").startOf("hour")
          : endMoment.startOf("hour");

    return {
      filtered,
      earliest: roundedDownStart,
      latest: roundedUpEnd
    };
  }

  groupSessionsIntoRows(all) {
    let grouped = {};
    (all || []).map(session => {
      if (session.day !== this.props.day.toString()) {
        return;
      }
      if (!session.hasDetails && !grouped[session.title]) {
        grouped[session.title] = [session]; // start sessions array as its a new entry
      } else if (!session.hasDetails && grouped[session.title]) {
        grouped[session.title].push(session); // start sessions array as its a new entry
      } else if (
        session.hasDetails &&
        session.title.indexOf("Keynote") > -1 &&
        !grouped[session.title]
      ) {
        grouped[session.title] = [session];
      } else if (session.hasDetails && !grouped.Sessions) {
        grouped.Sessions = [session];
      } else if (session.hasDetails && grouped.Sessions) {
        grouped.Sessions.push(session);
      }
    });
    return grouped;
  }

  render() {
    const { filteredSessions } = this.state;
    if (filteredSessions.length < 1) {
      return null;
    }
    const rows = filteredSessions.map((session, index) =>
      this.renderRow(session, index)
    );
    const gutters = rows.length > 1 ? ROW_GUTTERS * (rows.length - 1) : 0;
    const height =
      ROW_HEIGHT * rows.length + gutters + GRID_PADDING * 2 + LABELS_HEIGHT;
    const grid = this.renderGrid(
      height,
      this.state.dayStart,
      this.state.dayEnd
    );
    let now;
    if (
      this.state.now >= this.state.dayStart &&
      this.state.now <= this.state.dayEnd
    ) {
      now = this.renderNow(
        this.state.now,
        this.state.dayStart,
        this.state.dayEnd
      );
    }
    return (
      <View style={this.props.style}>
        <View style={[styles.container, { height }]}>
          {grid}
          <View style={{ marginTop: GRID_PADDING }}>{rows}</View>
          {now}
        </View>
      </View>
    );
  }

  renderRow(session, i) {
    const offset = ROW_HEIGHT * i + ROW_GUTTERS * i;

    return (
      <GanttRow
        containerWidth={this.props.width}
        dayStart={this.state.dayStart}
        dayEnd={this.state.dayEnd}
        sessionStart={session.start_time}
        sessionEnd={session.end_time}
        sessionTimes={session.times}
        location= "220C"
        title={session.title}
        offset={offset}
        key={`GanttRow_${i}`}
      />
    );
  }

  renderGrid(height, start, end) {
    return (
      <GanttGrid
        containerWidth={this.props.width}
        contentHeight={height}
        startTime={start}
        endTime={end}
      />
    );
  }

  renderNow(now, start, end) {
    return (
      <GanttNowMarker
        containerWidth={this.props.width}
        nowTime={now}
        startTime={start}
        endTime={end}
      />
    );
  }
}

/* StyleSheet =============================================================== */
const styles = StyleSheet.create({
  container: {}
});
