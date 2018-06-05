import React, { Component } from 'react';
import {Text, ScrollView, Dimensions } from 'react-native';


import ScheduleGantt from './ScheduleGantt';
import ScheduleListView from "./ScheduleListView";
import AppColors from '../../common/AppColors';



const BADGE_SIZE = 14,
  BADGE_PADDING_H = 3,
  UPDATE_LOOP_MINUTES = 1,
  UPDATE_LOOP_DURATION = UPDATE_LOOP_MINUTES * 60 * 1000; // convert ms;

  
const GANTT_PADDDING_H = 14,
  GANTT_WIDTH = Dimensions.get("window").width - GANTT_PADDDING_H * 2;


class Schedule extends Component {

  constructor(props) {
    super(props);

    this.state = {
      now: props.presetDate
        ? currentTimeOnConferenceDay(props.presetDate)
        : new Date().getTime()
    };
  }


    render(){
      const sessions = [{ id: 1, title: "Registration", day: 1, startTime: '2018-06-05 06:00', endTime: '2018-06-05 16:00', location: 'REGISTRATION' }, { id: 2, title: "Opening Speech", day: 1, startTime: '2018-06-05 07:00', endTime: '2018-06-05 07:30', location: '220A' }, { id: 3, title: "this is it", day: 1, startTime: '2018-06-05 08:00', endTime: '2018-06-05 10:30', location: '220B', hasDetails: true }, { id: 4, title: "Lunch", day: 1, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' }, { id: 5, title: "Luncash", day: 1, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' }, { id: 6, title: "Luncash", day: 1, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' }, { id: 7, title: "Luncssh", day: 1, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' }, { id: 8, title: "Luncsssh", day: 1, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' }];

      const day = 1;

        
        return (
            <ScrollView>
                <ScheduleGantt
                  style={{
                      backgroundColor: AppColors.color2,
                      paddingTop: 18,
                      paddingBottom: 12,
                      paddingHorizontal: GANTT_PADDDING_H
                  }}
                  sessions={sessions}
                  day={day}
                  width={GANTT_WIDTH}
                  now={this.state.now}
                />

                <ScheduleListView 
                  data = {sessions}
                />
            </ScrollView>
        )
    }
}

export default Schedule;