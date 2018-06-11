import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from "lodash";

import { getSchedule } from "../../actions/schedule";
import FilterSessions from "./filterSessions";
import groupSessions from "./groupSessions";
import ScheduleGantt from './ScheduleGantt';
import ScheduleListView from "./ScheduleListView";
import AppColors from '../../common/AppColors';
import AppTitleHeader from '../../common/AppTitleHeader'; 
import {AppLoading} from '../../common/AppLoading';
import EmptyPage from '../../common/EmptyPage';



const BADGE_SIZE = 14,
  BADGE_PADDING_H = 3,
  UPDATE_LOOP_MINUTES = 1,
  UPDATE_LOOP_DURATION = UPDATE_LOOP_MINUTES * 60 * 1000; // convert ms;

  
const GANTT_PADDDING_H = 14,
  GANTT_WIDTH = Dimensions.get("window").width - GANTT_PADDDING_H * 2;


class Schedule extends Component {

  constructor(props) {
    super(props);
    this.timer;

    this.state = {
      now: this.currentTime(),
    };

  }

  componentWillMount(props){
    this.props.getSchedule();
    this.timer = setInterval(() => {
      this.currentTime();
      this.props.getSchedule();      
    }, 10000);
  }

  componentWillUnmount(props) {
    clearInterval(this.timer);
  }

  currentTime = () =>{
    return new Date().getTime();
  }


  createTab = (sessions) => {
    // alert(JSON.stringify(sessions));
    let tabArray = [];
    for (let i = 1; i <= 5; i++) {
      let todaySessions = groupSessions(
        FilterSessions.byDay(sessions, i)
      );
      // alert(JSON.stringify(_.size(todaySessions)))
      if (_.size(todaySessions) > 0){
        tabArray.push(<View style={{flex:1, flexDirection: 'column'}} tabLabel= {`Day ${i}`} key = {`tab_${i}`}>
          <ScrollView style={{ flex: 1, flexDirection: 'column'}}>
            <ScheduleGantt
              style={{              
                backgroundColor: AppColors.color2,
                paddingTop: 18,
                paddingBottom: 12,
                paddingHorizontal: GANTT_PADDDING_H
              }}
              sessions={sessions}
              day={i}
              width={GANTT_WIDTH}
              now={this.state.now}
            />

            <ScheduleListView style = {{flex:1}}
              data={todaySessions}
              day = {i}
              navigator = {this.props.navigator}
            />
          </ScrollView>
        </View>);
      }else{
        tabArray.push(<View style={{ flex: 1, flexDirection: 'column' }} tabLabel={`Day ${i}`} key={`tab_${i}`}>
          <EmptyPage topic = "schedule"/>
        </View>
        )
      }

    }
    
    return tabArray;
  }


    render(){
      const sessions = [
        { id: 1, title: "Registration", day: 1, startTime: '2018-06-05 06:00', endTime: '2018-06-05 16:00', location: 'REGISTRATION', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
        { id: 1, title: "Registration", day: 2, startTime: '2018-06-05 06:00', endTime: '2018-06-05 16:00', location: 'REGISTRATION', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  }, 
        { id: 2, title: "Opening Speech", day: 1, startTime: '2018-06-05 07:00', endTime: '2018-06-05 07:30', location: '220A', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  }, 
        { id: 3, title: "this is it", day: 5, startTime: '2018-06-05 08:00', endTime: '2018-06-05 10:30', location: '220B', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",  hasDetails: true }, 
        { id: 4, title: "Lunch", day: 1, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  }, 
        { id: 5, title: "Luncash", day: 4, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' }, { id: 6, title: "Luncawsh", day: 1, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' }, { id: 7, title: "Luncssh", day: 2, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' }, { id: 8, title: "Luncsssh", day: 1, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' }, { id: 9, title: "Luncssssh", day: 2, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' },{ id: 10, title: "Luncssssh", day: 3, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' }, { id: 11, title: "Lunscsssh", day: 2, startTime: '2018-06-05 13:00', endTime: '2018-06-05 14:00', location: '220C' }];

      const day = 1;
      const height = Dimensions.get('window').height   
      const { schedule } = this.props;
        
        return (
          schedule.isLoading ? <AppLoading /> :
          <View style = {styles.container}>
            <AppTitleHeader
                title= 'Schedule'					  
                bgColor = 'white'
                textColor =  'black'
            />
           
            <View style={{ flex: 1 }}>
              <ScrollableTabView
                initialPage={0}
                onChangeTab={this._onChangeTab}
                renderTabBar={() => <DefaultTabBar
                  textStyle={{ color: 'black' }}
                  backgroundColor='white'
                  underlineStyle={{ backgroundColor: '#000' }}
                  style={{ backgroundColor: '#fff' ,borderWidth: 0}}
                />
                }
              >             
                {this.createTab(schedule.data)}
              </ScrollableTabView>
            </View>
          </View>
        )
    }
}

function mapStateToProps(state, ownProps) {
  // alert(JSON.stringify(state.schedule))
	return {
		schedule: state.schedule.data,
	}
}

// function mapDispatchToProps(dispatch) {
// 	return{
// 		actions:bindActionCreators(moviesActions, dispatch)
// 	}
// }


// export default (Schedule);
export default connect(mapStateToProps, { getSchedule })(Schedule);


const styles = StyleSheet.create({
  container:{
    flex: 1 
  },
  headerContainer:{
    padding:18,
    flexDirection:'row'
  },
  navIcon:{
    color:"black",
    height: 37,
    // width: 30,
    // marginTop: 12,
    alignSelf: 'center',
    textAlign:'right',
    marginRight: 15,
    flex: 1
  },
  title:{
    // textAlign: 'center',
    alignSelf:'center',
    flex:2,
    fontSize:24,
    fontWeight: 'bold',
    color: 'black'
  }
})